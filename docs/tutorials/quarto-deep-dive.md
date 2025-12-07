# Quarto Extension: The Complete Guide

This comprehensive guide covers everything you need to know about using the Examify Quarto extension to author, manage, and publish high-quality exams.

## 1. Installation Methods

### Option A: Direct from GitHub (Recommended)

The standard way to install Quarto extensions. This tracks the repository and allows for easy updates.

```bash
quarto add Data-Wise/examify
```

To install a specific version (e.g., for stability during a semester):

```bash
quarto add Data-Wise/examify@v0.4.0
```

### Option B: Archive Installation

If you are in an offline environment or prefer manual management, you can download the `examify-extension.zip` from our [GitHub Releases](https://github.com/Data-Wise/examify/releases) page.

```bash
# Unzip into your project
unzip examify-extension.zip
```

## 2. Project Configuration

We recommend managing your exam settings globally in `_quarto.yml` so all your exams share the same look and logic.

```yaml
project:
  title: "Fall 2024 Statistics"

format:
  exam-gfm: 
    qti-export: true  # <--- REQUIRED to generate QTI zip
    exam:
      default-points: 1
      shuffle-answers: true
  exam-pdf:
    exam:
      header:
        left: "STAT 101"
        right: "Name: ________________"
```

## 3. Authoring Workflow

### The "Single Source" Truth

The power of this extension is writing **one** document (`midterm.qmd`) that generates three outputs:

1. **Canvas Import** (`exam-gfm` + `examify` CLI)
2. **Student Printout** (`exam-pdf`)
3. **Answer Key** (`exam-pdf-solutions`)

### Formatting Questions

Use standard Markdown. The extension's Lua filters handle the layout differences.

```markdown
## 1. What is the derivative of $x^2$?

a) $x$
b) $2x$ [correct]
c) $2$
```

### Handling Solutions

Wrap full explanations in a solution block.

```markdown
::: {.solution}
**Reasoning:** The power rule states that $d/dx(x^n) = nx^{n-1}$.
:::
```

* **Student PDF**: This block is completely removed (layout adjusts to close the gap).
* **Answer Key**: This block is rendered with a distinct background style.
* **Canvas Export**: Removed (Canvas handles feedback differently, currently strictly question/answer).

## 4. Release & Versioning

### Freezing Exams

When you administer an exam, you should "freeze" the precise version of the extension and your code to ensure reproducibility if a grade challenge occurs months later.

1. **Lock Extension**: Ensure you installed via a specific tag (`@v0.4.0`) or commit your `_extensions` folder to Git.
2. **Render & Archive**: Keep the generated `.qti.zip` and `.pdf` files in a `releases/` folder in your repo.

## 5. Advanced Customization

### Customizing PDF Styles

The PDF format uses LaTeX. You can inject custom packages:

```yaml
format:
  exam-pdf:
    include-in-header:
      - \usepackage{amsmath}
      - \usepackage{chemfig}
```

### Customizing HTML/Marking Styles

The HTML preview uses SASS/CSS. You can override variables in `custom.scss`:

```scss
/* custom.scss */
$exam-primary: #7C3AED;
$solution-bg: #F3F4F6;
```

And link it in YAML:

```yaml
format:
  exam-html:
    theme: [cosmo, custom.scss]
```
