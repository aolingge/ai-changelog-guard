# GitHub Actions

```yaml
name: ai-changelog-guard

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npx github:aolingge/ai-changelog-guard --path fixtures/good.txt --min-score 80 --annotations
```
