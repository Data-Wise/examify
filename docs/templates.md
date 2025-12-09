# Templates

Ready-to-use templates to get you started quickly.

---

## Markdown Templates

No Quarto or R required — just edit and convert!

### Minimal (3 questions)

The quickest way to start. Just 3 questions to show the basics.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/minimal.md
examark minimal.md -o quiz.qti.zip
```

[:material-download: Download minimal.md](https://github.com/Data-Wise/examark/raw/main/examples/minimal.md){ .md-button }

---

### Starter Template

One of each question type with helpful comments.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/starter-exam-md.md
```

[:material-download: Download starter-exam-md.md](https://github.com/Data-Wise/examark/raw/main/examples/starter-exam-md.md){ .md-button }

---

### Statistics Exam

Real-world statistics exam with LaTeX math formulas.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/statistics-exam.md
```

[:material-download: Download statistics-exam.md](https://github.com/Data-Wise/examark/raw/main/examples/statistics-exam.md){ .md-button }

---

### Comprehensive (21 questions)

Full exam with all question types and edge cases covered.

```bash
curl -O https://raw.githubusercontent.com/Data-Wise/examark/main/examples/canvas-ready.md
```

[:material-download: Download canvas-ready.md](https://github.com/Data-Wise/examark/raw/main/examples/canvas-ready.md){ .md-button }

---

## Quarto Templates

For R and Python users who want dynamic, randomized questions.

!!! tip "Install the extension first"
    ```bash
    quarto add Data-Wise/examark
    ```

### Minimal Quarto

Simplest possible Quarto exam.

[:material-download: Download minimal.qmd](https://github.com/Data-Wise/examark/raw/main/examples/minimal.qmd){ .md-button }

---

### Starter Quarto

Full-featured starter with all question types.

[:material-download: Download starter-exam.qmd](https://github.com/Data-Wise/examark/raw/main/examples/starter-exam.qmd){ .md-button }

---

### Dynamic Questions

Randomized questions using R code chunks.

[:material-download: Download dynamic-questions.qmd](https://github.com/Data-Wise/examark/raw/main/examples/dynamic-questions.qmd){ .md-button }

---

## Download All Templates

Clone or download the entire examples folder:

```bash
git clone https://github.com/Data-Wise/examark.git
cd examark/examples
```

Or [browse templates on GitHub →](https://github.com/Data-Wise/examark/tree/main/examples)
