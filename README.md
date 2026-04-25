<p align="center">
  <img src="assets/readme-banner.svg" alt="AI Changelog Guard banner" width="100%">
</p>

<h1 align="center">AI Changelog Guard</h1>

<p align="center">Check changelogs for AI-assisted changes, verification evidence, breaking changes, and release links.</p>

<p align="center"><a href="README.zh-CN.md">中文</a> · <a href="#quick-start">Quick Start</a> · <a href="#checks">Checks</a></p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/node-%3E%3D18-2563EB">
  <img alt="dependencies" src="https://img.shields.io/badge/dependencies-0-111827">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-16A34A">
</p>

<p align="center">
  <img src="assets/cli-preview.svg" alt="AI Changelog Guard CLI preview" width="88%">
</p>

## Why This Exists

AI agent workflows keep growing, but many repos still lack tiny local checks that are easy to run in CI. This tool stays zero-dependency, mirror-friendly, and easy to fork.

## Quick Start

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

## Checks

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

## Contributing

Good first PRs: add checks, add fixtures, improve docs, or add GitHub Actions examples.

## License

MIT
