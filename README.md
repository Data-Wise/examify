# Canvas QTI Converter

Convert Markdown/Text question files to Canvas-compatible QTI format for easy quiz import.

## Features

- 📝 Write questions in familiar Markdown format
- 🔢 Supports Multiple Choice, True/False, Essay, Short Answer
- 🧮 Preserves LaTeX math notation (`\( \alpha \)`)
- 📦 Outputs valid QTI 2.1 XML for Canvas import
- ✅ Built-in diagnostics command (`verify`) to check package integrity

## Automation

This repository includes a GitHub Action to integrate **Google's Gemini AI** for automated PR reviews and issue assistance.

1. Go to your repository **Settings** > **Secrets and variables** > **Actions**.
2. Create a new Repository Secret named `GEMINI_API_KEY` with your Google Gemini API key.
3. The workflow will automatically run on:
    - New Pull Requests (Code Review)
    - Issue Comments (On-demand help via `@gemini-cli`)

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd canvas-qti-converter

# Install dependencies
npm install

# Build
npm run build

# Link globally (optional)
npm link
```

## Usage

### Convert Questions

```bash
# Basic conversion
qti-convert questions.md

# Convert with custom output name
qti-convert questions.md -o my-quiz.qti.zip

# Preview parsed questions (dry run)
qti-convert questions.md --preview
```

### Verify Package

Check a QTI package for common errors, valid structure, and Canvas compatibility.

```bash
qti-convert verify my-quiz.qti.zip
# or check a directory
qti-convert verify ./my-quiz-folder/
```

### Options

| Option | Description |
|--------|-------------|
| `-o, --output <file>` | Output zip file (default: `<input>.qti.zip`) |
| `-v, --validate` | Validate output structure after generation |
| `--preview` | Preview parsed questions without generating file |

## Input Format

```markdown
# Pool: My Question Bank
Points: 2

---

## Section: Topic Name

Instructions for this section.

1. What is the correct answer?
   *a) This is correct (asterisk marks it)
   b) Wrong answer
   c) Wrong answer
   d) Wrong answer

2. [Essay, 10pts] Explain your reasoning.

3. [TF] True or false statement here.
   *True
   False
```

### Syntax

- `# Pool: Name` - Question bank name
- `Points: N` - Default points per question
- `## Section: Name` - Group questions by topic
- `*a)` - Asterisk prefix marks correct answer
- `[Essay, Npts]` - Question type override with points
- `\( LaTeX \)` - Inline math preserved

## License

MIT
