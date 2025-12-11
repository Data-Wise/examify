# Statistics 101 Midterm Exam
## Example Reference for Examark Format

This is a complete working example demonstrating all major question types and best practices.

---

# Section: Descriptive Statistics

1. [MC] Which measure of center is most resistant to outliers? [1pt]
a) Mean
b) Median [x]
c) Mode
d) Range

> [feedback] The median is the middle value and is not affected by extreme values, unlike the mean which uses all data points in its calculation.

2. [MC] If the mean is greater than the median, the distribution is likely: [2pts]
a) Left-skewed
b) Right-skewed [x]
c) Symmetric
d) Uniform

3. [TF] The variance can never be negative. → True [1pt]

4. [MA] Which are measures of spread? [3pts]
a) Mean
b) Standard deviation [x]
c) Variance [x]
d) Median
e) Range [x]

5. [Num] Calculate the mean of the following values: 10, 15, 20, 25, 30 [2pts]

Answer: 20 ± 0

6. [MC] The sample variance formula is: [2pts]
a) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n}$
b) $s^2 = \frac{\sum (x_i - \bar{x})^2}{n-1}$ [x]
c) $s = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n-1}}$
d) $\sigma^2 = \frac{\sum (x_i - \mu)^2}{N}$

> [feedback] The sample variance uses $n-1$ in the denominator (Bessel's correction) to provide an unbiased estimate of the population variance.

# Section: Probability

7. [MC] If $P(A) = 0.4$ and $P(B) = 0.3$, and $A$ and $B$ are independent, what is $P(A \text{ and } B)$? [2pts]
a) 0.12 [x]
b) 0.70
c) 0.10
d) 0.50

8. [TF] If two events are independent, they must be mutually exclusive. → False [1pt]

> [feedback] Independent events can occur together. Mutually exclusive events cannot occur together. These are different concepts.

9. [MA] Which conditions indicate events A and B are independent? [3pts]
a) $P(A \cap B) = P(A) \times P(B)$ [x]
b) $P(A|B) = P(A)$ [x]
c) $P(A \cup B) = P(A) + P(B)$
d) $P(B|A) = P(B)$ [x]
e) $P(A \cap B) = 0$

10. [Short] If you flip a fair coin twice, what is the probability of getting exactly one heads? [2pts]

Answer: 0.5
Answer: 1/2
Answer: 50%

# Section: Sampling and Study Design

11. [MC] A numerical characteristic of a population (like $\mu$ or $\sigma$) is called a: [1pt]
a) Statistic
b) Parameter [x]
c) Variable
d) Sample

12. [TF] An observational study can prove causation. → False [1pt]

13. [Match] Match each sampling method to its description. [4pts]
- Simple random sampling => Every individual has equal chance of selection
- Stratified sampling => Divide population into groups, sample from each
- Cluster sampling => Divide population into groups, randomly select entire groups
- Systematic sampling => Select every kth individual from ordered list

14. [Short] What is the name for a subset of the population that is actually measured? [1pt]

Answer: sample
Answer: Sample

# Section: Hypothesis Testing

15. [MC] In hypothesis testing, rejecting a true null hypothesis is called: [2pts]
a) Type I error [x]
b) Type II error
c) Correct decision
d) Power

16. [MC] A p-value of 0.03 with $\alpha = 0.05$ leads to which decision? [2pts]
a) Reject $H_0$ [x]
b) Fail to reject $H_0$
c) Accept $H_0$
d) Cannot determine

17. [TF] A p-value is the probability that the null hypothesis is true. → False [1pt]

> [feedback] The p-value is the probability of observing data as extreme as ours (or more extreme) IF the null hypothesis is true. It is NOT the probability that $H_0$ is true.

18. [Num] If $\bar{x} = 52$, $\mu_0 = 50$, $s = 8$, and $n = 64$, calculate the test statistic: $t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}}$ [3pts]

Answer: 2 ± 0.1

# Section: Confidence Intervals

19. [MC] A 95% confidence interval for $\mu$ is (45, 55). Which statement is correct? [2pts]
a) 95% of the data falls between 45 and 55
b) There's a 95% probability that $\mu$ is between 45 and 55
c) We are 95% confident that $\mu$ is between 45 and 55 [x]
d) 95% of sample means are between 45 and 55

20. [MA] To decrease the width of a confidence interval, you can: [3pts]
a) Increase sample size [x]
b) Decrease confidence level [x]
c) Increase variability
d) Decrease sample size

# Section: Regression and Correlation

21. [MC] If the correlation coefficient is $r = -0.85$, the relationship is: [2pts]
a) Strong positive
b) Weak positive
c) Strong negative [x]
d) Weak negative

22. [MC] The coefficient of determination $R^2$ represents: [2pts]
a) The correlation coefficient squared
b) The proportion of variance in $Y$ explained by $X$ [x]
c) The slope of the regression line
d) The standard error of the estimate

23. [Num] If the correlation is $r = 0.6$, what is $R^2$? [2pts]

Answer: 0.36 ± 0.01

24. [MC] If the regression equation is $\hat{y} = 5 + 3x$, what is the predicted value when $x = 4$? [2pts]
a) 12
b) 17 [x]
c) 20
d) 9

# Section: Fill-in-Multiple-Blanks

25. [FMB] Complete the Central Limit Theorem statement. [3pts]

The sampling distribution of the sample [blank1] approaches a [blank2] distribution as the sample size [blank3].

[blank1]: mean
[blank2]: normal, Normal
[blank3]: increases, gets larger, grows

# Section: Essay

26. [Essay, 10pts] Explain the difference between correlation and causation.

Your answer should include:
- Definition of each concept
- Why correlation does not imply causation
- At least one specific example
- What is needed to establish causation

---

## Why This Example Works

### ✅ Demonstrates Best Practices

1. **All Question Types**: MC, TF, MA, Short, Num, Match, FMB, Essay
2. **LaTeX Math**: Proper use of `$...$` for inline and `$$...$$` for display
3. **Correct Markers**: Uses `[x]` exclusively (no bold!)
4. **Feedback**: Shows all three types (inline, blockquote, general)
5. **Sections**: Organized by topic
6. **Points**: All questions have explicit points
7. **Type Markers**: Explicit and consistent

### 📊 Statistics Covered

- Descriptive statistics (mean, median, variance, SD)
- Probability (independence, conditional probability)
- Sampling and study design
- Hypothesis testing (errors, p-values)
- Confidence intervals
- Regression and correlation

### 🎯 Question Distribution

| Type | Count | Total Points |
|------|-------|--------------|
| MC | 12 | 22 pts |
| TF | 5 | 5 pts |
| MA | 3 | 9 pts |
| Short | 3 | 5 pts |
| Num | 3 | 7 pts |
| Match | 1 | 4 pts |
| FMB | 1 | 3 pts |
| Essay | 1 | 10 pts |
| **Total** | **26** | **65 pts** |

---

## How to Use This Example

### In Claude Desktop Project

1. Upload this file as knowledge
2. Reference it when generating exams:
   ```
   "Generate a quiz similar to the example exam,
   but focused on probability topics"
   ```

### As a Template

Copy sections you need:
```markdown
# Copy the MC section structure
# Modify questions for your topic
# Keep the formatting intact
```

### For Syntax Validation

Compare your exams to this example:
- Same answer markers? ✓
- Same type markers? ✓
- Same points format? ✓
- Same LaTeX usage? ✓

### For Learning

Study how this example:
- Structures questions
- Provides feedback
- Uses LaTeX formulas
- Organizes by section
- Balances difficulty

---

## Converting to Quarto

Wrap in YAML header:

```yaml
---
title: "Statistics 101 Midterm Exam"
format: exam-gfm
exam:
  qti: true
  solutions: false
  default-points: 2
---

[paste questions here]
```

Then render:
```bash
quarto render midterm.qmd --to exam-gfm
examark midterm.md -o midterm.qti.zip
```

---

## Validation Checklist

Use this example to verify your exams:

- [ ] Questions numbered 1, 2, 3...
- [ ] All have type markers: `[MC]`, `[TF]`, etc.
- [ ] All have points: `[1pt]`, `[2pts]`
- [ ] Correct answers marked with `[x]`
- [ ] LaTeX in `$...$` notation
- [ ] No `**bold**` on answers
- [ ] Feedback provided where helpful
- [ ] Sections organized logically
- [ ] Matching uses `=>` separator
- [ ] FMB has blank definitions
- [ ] Numerical has `± tolerance`

**If your exam matches these patterns, it's ready for QTI conversion!**
