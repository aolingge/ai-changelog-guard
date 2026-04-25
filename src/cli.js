#!/usr/bin/env node
import process from 'node:process'
import { checkFile, formatAnnotations, formatMarkdown, formatSarif, formatText } from './check.js'

function parseArgs(argv) {
  const args = { path: null, minScore: 70, json: false, markdown: false, redact: false, annotations: false, sarif: false, help: false, version: false }
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i]
    if (item === '--path') args.path = argv[++i]
    else if (item === '--min-score') args.minScore = Number(argv[++i])
    else if (item === '--json') args.json = true
    else if (item === '--markdown') args.markdown = true
    else if (item === '--redact') args.redact = true
    else if (item === '--annotations') args.annotations = true
    else if (item === '--sarif') args.sarif = true
    else if (item === '--version') args.version = true
    else if (item === '-h' || item === '--help') args.help = true
    else if (!args.path) args.path = item
    else throw new Error(`Unknown option: ${item}`)
  }
  return args
}

function help() {
  console.log(`ai-changelog-guard v0.1.0

Usage:
  ai-changelog-guard --path FILE
  ai-changelog-guard FILE --markdown
  ai-changelog-guard FILE --sarif > results.sarif
  ai-changelog-guard FILE --annotations
  ai-changelog-guard FILE --redact
`)
}

try {
  const args = parseArgs(process.argv.slice(2))
  if (args.version) { console.log('0.1.0'); process.exit(0) }
  if (args.help) { help(); process.exit(0) }
  if (!args.path) throw new Error('Missing file path')
  const report = checkFile(args.path)
  if (args.redact) console.log(report.redacted)
  else if (args.json) console.log(JSON.stringify(report, null, 2))
  else if (args.markdown) console.log(formatMarkdown(report))
  else if (args.sarif) console.log(JSON.stringify(formatSarif(report), null, 2))
  else if (args.annotations) console.log(formatAnnotations(report))
  else console.log(formatText(report))
  process.exit(report.score >= args.minScore ? 0 : 1)
} catch (error) {
  console.error(`ai-changelog-guard: ${error.message}`)
  process.exit(2)
}
