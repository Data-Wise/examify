# Examark Skills and Guides

This directory contains Claude skills and reference guides for generating exams in examark format.

---

## For Claude Desktop App

Upload these files to a Claude Desktop Project for exam generation:

### Core Skills (Required)

| File | Purpose | Size | Upload? |
|------|---------|------|---------|
| `claude-desktop-exam-generation.md` | Question patterns and templates | 4.2K | ✅ Yes |
| `claude-desktop-examark-formatting.md` | Syntax rules and examples | 6.5K | ✅ Yes |
| `examark-example-exam.md` | Complete working example (26 questions) | 7.7K | ✅ Yes |
| `examark-quick-reference.md` | One-page cheat sheet | 4.8K | ✅ Yes |

### Setup Guide (Optional)

| File | Purpose | Size | Upload? |
|------|---------|------|---------|
| `claude-desktop-project-setup-guide.md` | Step-by-step setup instructions | 6.7K | 📖 Reference |

**Total to upload**: 4 files (~30KB)

---

## For Claude Code CLI

These skills are automatically available when working in this project with Claude Code:

| File | Purpose | Size |
|------|---------|------|
| `quarto-examark-generator.md` | Comprehensive Quarto exam generation | 17K |
| `statistics-exam-generator.md` | Statistics-specific templates | 16K |

---

## Quick Start

### Option 1: Claude Desktop Project

1. **Create Project**: "Examark Quiz Builder"
2. **Upload Files**:
   - claude-desktop-exam-generation.md
   - claude-desktop-examark-formatting.md
   - examark-example-exam.md
   - examark-quick-reference.md
3. **Set Instructions**:
   ```
   Generate exams in examark format for Canvas LMS.
   Always use [x] markers (never **bold**).
   Include LaTeX for math formulas.
   ```
4. **Test**: Generate a sample quiz

### Option 2: Claude Code

Skills are already available! Just ask:
```
Use the quarto-examark-generator skill to create a statistics midterm
```

---

## File Descriptions

### claude-desktop-exam-generation.md
Core skill for exam generation. Includes:
- All 8 question types with examples
- Subject-specific patterns (statistics, math)
- LaTeX-safe answer markers
- Feedback formats
- Quality checklist

### claude-desktop-examark-formatting.md
Complete syntax reference. Includes:
- Type markers and aliases
- Answer marker rules
- LaTeX notation
- Common errors and fixes
- Validation checklist

### examark-example-exam.md
Full working example (26 questions). Demonstrates:
- All question types
- LaTeX formulas
- Feedback formats
- Section organization
- Statistics topics

### examark-quick-reference.md
One-page cheat sheet. Contains:
- Quick syntax patterns
- Common formulas (stats & calculus)
- Validation checklist
- Quick prompts for Claude

### claude-desktop-project-setup-guide.md
Complete setup instructions. Covers:
- Project creation
- File upload process
- Usage patterns
- Troubleshooting
- Advanced features

### quarto-examark-generator.md
Comprehensive Quarto generation guide. Includes:
- YAML configuration
- Dynamic content with R/Python
- All output formats
- Templates and patterns
- Error prevention

### statistics-exam-generator.md
Statistics-specific skill. Specialized for:
- Descriptive statistics
- Probability
- Hypothesis testing
- Regression and correlation
- Dynamic R code examples

---

## Usage Examples

### Generate Basic Quiz
```
Create a 5-question statistics quiz on descriptive statistics
```

### Generate with Specifics
```
Generate a 10-question exam:
- 5 MC on probability (2pts each)
- 3 TF on hypothesis testing (1pt each)
- 2 Essay on interpretation (10pts each)
Include LaTeX formulas and feedback.
```

### Convert Existing Questions
```
Convert this to examark format:
[paste your questions]
```

### Fix Syntax Errors
```
Check this exam for examark syntax errors:
[paste content]
```

---

## Workflow

### Markdown Users
```bash
# Generate exam in Claude → save as quiz.md
examark quiz.md -o quiz.qti.zip
# Upload to Canvas
```

### Quarto Users
```bash
# Generate exam in Claude → save as quiz.qmd
quarto render quiz.qmd --to exam-gfm
examark quiz.md -o quiz.qti.zip
# Upload to Canvas
```

---

## Version Control

These files are included in the examark repository for:
- ✅ Documentation
- ✅ Version control
- ✅ Sharing with contributors
- ✅ Reference for developers

---

## Maintenance

### Updating Skills

When examark format changes:
1. Update skill files in `.claude/skills/`
2. Commit changes to repo
3. Re-upload to Claude Desktop projects
4. Notify users

### Adding New Skills

To add a new skill:
1. Create `.md` file in this directory
2. Follow existing format/structure
3. Update this README
4. Commit to repo

---

## Support

- **Examark Docs**: https://data-wise.github.io/examark/
- **Issues**: https://github.com/Data-Wise/examark/issues
- **Templates**: `templates/` directory in repo
- **Examples**: `examples/` directory in repo

---

**Last Updated**: December 2025
