<p align="center">
  <img src="assets/readme-banner.svg" alt="AI Changelog Guard banner" width="100%">
</p>

<h1 align="center">AI Changelog Guard</h1>

<p align="center">检查 changelog 是否记录 AI 辅助改动、验证证据、破坏性变更和发布链接。</p>

<p align="center"><a href="README.md">English</a> · <a href="#快速开始">快速开始</a> · <a href="#检查项">检查项</a></p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-2563EB">
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-111827">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-16A34A">
</p>

<p align="center">
  <img src="assets/cli-preview.svg" alt="AI Changelog Guard CLI preview" width="88%">
</p>

## 为什么做这个

AI Agent 工具链继续快速增长，但很多仓库缺少小而清晰的本地检查器。这个工具保持零依赖、可接 CI、可双端镜像。

## 快速开始

```bash
npx github:aolingge/ai-changelog-guard --path CHANGELOG.md
```

Generate Markdown:

```bash
npx github:aolingge/ai-changelog-guard --path CHANGELOG.md --markdown > report.md
```

Generate SARIF:

```bash
npx github:aolingge/ai-changelog-guard --path CHANGELOG.md --sarif > results.sarif
```

## 检查项

| Check | What it looks for |
| --- | --- |
| version | Mentions version. |
| ai-assisted | Mentions AI-assisted work when relevant. |
| verification | Mentions verification. |
| breaking | Mentions breaking changes or compatibility. |


## Quality Gate

Use this project as a repeatable gate before an AI agent marks work as done:

- [Quality gate guide](docs/quality-gates.md)
- [Copy-ready GitHub Actions example](examples/github-action.yml)

## CI Usage

See [docs/github-actions.md](docs/github-actions.md).

## Mirrors

- GitHub: https://github.com/aolingge/ai-changelog-guard
- Gitee: https://gitee.com/aolingge/ai-changelog-guard

## Visual Identity

The banner and CLI preview are SVG assets committed in `assets/`, so the README renders cleanly on GitHub and Gitee without external image hosting.

## 参与贡献

Good first PRs: add checks, add fixtures, improve docs, or add GitHub Actions examples.

## License

MIT
