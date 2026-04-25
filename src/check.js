import fs from 'node:fs'

const secretPattern = /(github_pat_|ghp_|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16})/g
const checks = [
  {
    "id": "version",
    "pattern": "v\\d+\\.\\d+\\.\\d+|version|版本",
    "message": "Mentions version."
  },
  {
    "id": "ai-assisted",
    "pattern": "ai|agent|codex|claude|AI 辅助|智能体",
    "message": "Mentions AI-assisted work when relevant."
  },
  {
    "id": "verification",
    "pattern": "test|build|lint|ci|验证|测试",
    "message": "Mentions verification."
  },
  {
    "id": "breaking",
    "pattern": "breaking|migration|兼容|破坏|迁移",
    "message": "Mentions breaking changes or compatibility."
  }
]

function testPattern(text, pattern) {
  if (pattern === 'REDACTION_SPECIAL') return !secretPattern.test(text)
  return new RegExp(pattern, 'i').test(text)
}

export function redactText(text) {
  return text.replace(secretPattern, '[REDACTED_SECRET]')
}

export function checkText(text, file = '<inline>') {
  const results = checks.map((check) => {
    const ok = testPattern(text, check.pattern)
    return { status: ok ? 'PASS' : 'FAIL', check: check.id, message: ok ? check.message : `Missing signal: ${check.message}` }
  })
  const score = Math.round((results.filter((item) => item.status === 'PASS').length / results.length) * 100)
  return { file, score, results, redacted: redactText(text) }
}

export function checkFile(file) {
  return checkText(fs.readFileSync(file, 'utf8'), file)
}

export function formatText(report, title = "AI Changelog Guard") {
  const lines = [`${title} score: ${report.score}/100`, `File: ${report.file}`, '']
  for (const result of report.results) lines.push(`${result.status.padEnd(5)} ${result.check.padEnd(18)} ${result.message}`)
  return lines.join('\n')
}

export function formatMarkdown(report, title = "AI Changelog Guard") {
  const rows = report.results.map((result) => `| ${result.status} | ${result.check} | ${result.message} |`).join('\n')
  return `# ${title} Report

Score: **${report.score}/100**

File: \`${report.file}\`

| Status | Check | Message |
| --- | --- | --- |
${rows}
`
}

export function formatAnnotations(report) {
  return report.results.filter((result) => result.status !== 'PASS').map((result) => `::warning file=${report.file},title=${result.check}::${result.message}`).join('\n')
}

export function formatSarif(report, toolName = "ai-changelog-guard") {
  return {
    version: '2.1.0',
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    runs: [{
      tool: { driver: { name: toolName, informationUri: `https://github.com/aolingge/${toolName}`, rules: report.results.map((result) => ({ id: result.check, name: result.check, shortDescription: { text: result.message } })) } },
      results: report.results.filter((result) => result.status !== 'PASS').map((result) => ({ ruleId: result.check, level: 'warning', message: { text: result.message }, locations: [{ physicalLocation: { artifactLocation: { uri: report.file.replaceAll('\\', '/') }, region: { startLine: 1 } } }] })),
    }],
  }
}
