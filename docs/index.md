---
hide:
  - navigation
---

# Canvas QTI Converter

<div align="center" markdown>

![Canvas QTI Converter Logo](https://img.shields.io/badge/Canvas-QTI_2.1-red)

**A professional tool to convert Markdown questions into Canvas-compatible QTI 2.1 packages.**

[Get Started](usage.md){ .md-button .md-button--primary } [View on GitHub](https://github.com/Data-Wise/canvas-qti-converter){ .md-button }

</div>

---

<div class="grid cards" markdown>

- :material-pencil: **Markdown First**

    Write your exams in clean, version-control friendly Markdown. No more clicking through slow web interfaces.

- :material-check-all: **Answer Support**

    Mark correct answers easily with `*` or `✓`. Supports Multiple Choice, True/False, Essays, and Short Answers.

- :material-sigma: **Math Ready**

    Full LaTeX support for mathematical formulas. We handle the complex conversion to Canvas-compatible XML.

- :material-image: **Image Bundling**

    Reference local images in your markdown. We automatically bundle and link them in the QTI package.

</div>

## Quick Start

Install the tool globally and convert your first quiz in seconds.

```bash
# Install
npm install -g canvas-qti-converter

# Convert
qti-convert final-exam.md

# Verify
qti-convert verify final-exam.qti.zip
```

## Why use this?

!!! quote "Stop fighting the LMS"
    Creating quizzes in Canvas can be tedious. This tool allows you to treat your exams like code:

    *   **Version Control**: Track changes to your questions in Git.
    *   **Offline Editing**: accurate previews and linting without being online.
    *   **Bulk Creation**: Generate huge question banks instantly from text files.
