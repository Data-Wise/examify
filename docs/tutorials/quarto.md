# Integration with Quarto & R

Examify works seamlessly with Quarto and RMarkdown, making it a powerful tool for generating data science and statistics exams.

## Why use Quarto?

- **Dynamic Content**: Generate random numbers for unique question variants.
- **Reproducibility**: Keep your exam source code version controlled.
- **Plots**: Automatically generate and embed R/Python plots into your exam questions.

## Setup

Enable the `examify` output format in your `_quarto.yml` or document header:

```yaml
title: "Statistics Midterm"
format:
  commonmark:
    variant: -raw_html+tex_math_dollars
```

!!! tip "Output Format"
    Examify consumes standard Markdown. Quarto's `commonmark` or `gfm` (GitHub Flavored Markdown) output works best.

## Writing Questions with Code

You can use inline code and code blocks as usual.

### Example: Dynamic Values

```markdown
## 1. Calculate the mean of the following numbers: `r paste(numbers, collapse=", ")`.

*a) `r mean(numbers)`
b)  `r mean(numbers) + 1`
c)  `r mean(numbers) - 1`
```

### Example: Embedding Plots

Examify automatically bundles images referenced in Markdown. When Quarto renders code chunks to images, it usually places them in a `_files` directory.

````markdown
```{r}
#| echo: false
#| fig.cap: "Histogram"
hist(rnorm(100), main="Sample Distribution")
```
````

a) Uniform
*b) Normal
c) Exponential

```

1. **Render** your Quarto document: `quarto render exam.qmd`
2. **Convert** the output md: `examify exam.md -o exam.qti.zip`

## Best Practices

### Hiding Solutions

Quarto documents often contain solution blocks. You don't want these in the student version!

Examify automatically strips HTML blocks with class `solution` or `proof`.

```markdown
::: {.solution}
**Answer:** The mean is calculated by summing all values...
:::
```

### Answer Markers

In programmatic generation, using the `[correct]` suffix is often safer than bolding or checkmarks, as it avoids Markdown parsing ambiguity.

```markdown
1. Option A
2. Option B [correct]
3. Option C
```

## Workflow Automation

You can automate the entire process with a simple shell script or Makefile:

```bash
#!/bin/bash
# build_exam.sh

# 1. Render Quarto to Markdown
quarto render midterms/exam-v1.qmd --to commonmark

# 2. Convert to Canvas QTI
examify midterms/exam-v1.md -o output/exam-v1.qti.zip

# 3. Verify
examify verify output/exam-v1.qti.zip
```
