# Examify - Project Notes

## Project Overview

- **Location**: `/Users/dt/dev-tools/examify`
- **Purpose**: Create exams from Markdown and export to Canvas QTI format
- **Documentation**: <https://data-wise.github.io/examify/>
- **Version**: 0.4.0 (released 2025-12-07)
- **Status**: ✅ Stable - All 35 tests passing

## Quick Start

```bash
# Install globally
npm link

# Convert markdown to QTI
examify input.md -o scratch/output.qti.zip

# Verify QTI package
examify verify package.qti.zip

# Simulate Canvas import
examify emulate-canvas package.qti.zip
```

## Key Commands

| Command | Description |
|---------|-------------|
| `examify <file> -o <out.qti.zip>` | Convert Markdown to QTI |
| `examify verify <pkg>` | Validate QTI package structure |
| `examify emulate-canvas <pkg>` | Simulate Canvas import |
| `examify <file> --preview` | Preview parsed questions |
| `examify check <file>` | Lint input file |

## Development Commands

```bash
npm install      # Install dependencies
npm run build    # Build project
npm test         # Run all tests (35 tests)
npm link         # Install globally as 'examify'
```

## Development Rules

- **Generated test files go in `scratch/`** - Keep root directory clean
- **Build before testing**: `npm run build`
- **QTI format**: Uses QTI 1.2 (Canvas Classic Quizzes), not QTI 2.1
- **Images**: Bundled in package with `imsmanifest.xml`
- **Always work on `dev` branch**: All development MUST happen on `dev` branch. Only merge to `main` for releases.

## Architecture

```
src/
├── index.ts              # CLI entry point (Commander.js)
├── parser/               # Markdown → Question objects
├── generator/            # Question objects → QTI XML
├── diagnostic/           # Validator + Canvas emulator
└── utils/                # Shared utilities
```

## Documentation Structure

Follows Data-Wise MkDocs standards (claude-r-dev pattern):

```
docs/
├── index.md              # Homepage with features
├── getting-started.md    # Installation + first steps
├── reference.md          # Commands Reference
├── formats.md            # Input syntax guide
├── emulator.md           # Canvas emulator
├── troubleshooting.md    # Common issues
├── contributing.md       # Contribution guide
├── tutorials/
│   ├── index.md          # Tutorial overview
│   ├── quarto.md         # R/Quarto integration
│   └── vscode-snippets.md
└── extensions/
    └── quarto.md         # Quarto extension docs
```

**Theme**: Material with indigo/purple colors, flat navigation.

## Input Format

Questions MUST use `## N. Question` format (with ##):

```markdown
# Pool: Quiz Title

# Section: Multiple Choice

## 1. What is 2 + 2? [2 pts]

1)  Three
2)  **Four** ✓
3)  Five

## 2. [TF] The sky is blue. → True

## 3. [Essay, 10pts] Explain your answer.
```

### Correct Answer Markers

- `**Bold**` or `✓` checkmark
- `[correct]` suffix (Quarto-friendly)
- `*` prefix (e.g., `*a) Answer`)
- `→ True` or `→ False` for T/F questions

## Question Types

| Type | Syntax |
|------|--------|
| Multiple Choice | Default |
| True/False | `[TF]` or `→ True/False` |
| Multiple Answer | `[MultiAns]` |
| Essay | `[Essay]` |
| Short Answer | `[Short]` |
| Numeric | `[Numeric]` with `± tolerance` |

## Folder Structure

| Directory | Purpose |
|-----------|---------|
| `src/` | TypeScript source |
| `dist/` | Compiled JavaScript |
| `docs/` | MkDocs documentation |
| `examples/` | Sample input files |
| `scratch/` | Generated test QTI files (always output here) |
| `tests/` | Vitest test suite |
| `_extensions/` | Quarto extension |

## Workflows Available

| Command | Description |
|---------|-------------|
| `/build-test` | Build, test, generate QTI from markdown |
| `/convert-quiz` | Convert markdown to QTI and verify |
| `/deploy-docs` | Deploy docs to GitHub Pages |
| `/release` | `npm version patch` (Automated release) |

## Git Status

- **Branch**: dev
- **Latest tag**: v0.4.0
- **Remote**: origin/dev (active)
