# STAT 101 - Quarto Test Import (Dec 6)


**Name:**
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
**Student ID:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Time:** 75 minutes \| **Total Points:** 45 \| **Date:** **?meta:date**

------------------------------------------------------------------------

**Instructions:**

1.  Write your name on this page and on every subsequent page.
2.  Calculators permitted. No notes, textbooks, or electronic devices.
3.  Show all work for partial credit.
4.  For multiple choice, circle the best answer.

------------------------------------------------------------------------

| Section               | Points | Score |
|-----------------------|--------|-------|
| Multiple Choice (1-5) | 10     |       |
| True/False (6-10)     | 5      |       |
| Short Answer (11-12)  | 10     |       |
| Essay (13-14)         | 20     |       |
| **Total**             | **45** |       |

------------------------------------------------------------------------



# Multiple Choice (10 points)

*Circle the best answer. 2 points each.*

## 1. Sample Variance \[2 pts\]

Which statement correctly describes the formula below?

$$s^2 = \frac{\sum(X_i - \bar{X})^2}{n-1}$$

1)  Sum of deviations
2)  **Average squared deviation, divided by n−1**
3)  Square root of sum of squares
4)  Range divided by 2

<div class="proof solution">

<span class="proof-title">*Solution*. </span>The sample variance divides
by n-1 (degrees of freedom) to provide an unbiased estimate.

</div>

## 2. Coefficient of Determination \[2 pts\]

What does $R^2$ represent in regression analysis?

1)  Correlation between X and Y
2)  Slope of regression line
3)  **Proportion of variance explained**
4)  Standard error

## 3. Type I Error \[2 pts\]

1)  Failing to reject false H₀
2)  **Rejecting true H₀**
3)  Wrong test
4)  Small sample

## 4. Central Tendency \[2 pts\]

Which is most affected by outliers?

1)  Mode
2)  Median
3)  **Mean**
4)  All equal

## 5. Standard Error \[2 pts\]

1)  σ
2)  σ²
3)  **σ/√n**
4)  σ/n

# True/False (5 points)

*Circle the correct answer. 1 point each.*

## 6. P-value = P(H₀ is true). \[1 pt\]

1)  True
2)  False

## 7. Correlation implies causation. \[1 pt\]

1)  True
2)  False

## 8. Median = 50th percentile. \[1 pt\]

1)  True
2)  False

## 9. 95% CI = 95% probability parameter is inside. \[1 pt\]

1)  True
2)  False

## 10. CLT requires normal population. \[1 pt\]

1)  True
2)  False

# Short Answer (10 points)

## 11. Z-Score Calculation \[5 pts\]

Calculate the z-score for X=85, μ=70, σ=10.

> [!TIP]
>
> ### Solution
>
> z = (X - μ) / σ = (85 - 70) / 10 = 15/10 = **1.5**

## 12. Conditions for Causation \[5 pts\]

List three conditions for causation.

> [!TIP]
>
> ### Solution
>
> 1.  **Temporal precedence** - cause precedes effect
> 2.  **Covariation** - variables are related
> 3.  **No alternative explanation** - rule out confounders

# Essay (20 points)

## 13. Statistical vs Practical Significance \[10 pts\]

Explain statistical vs practical significance.

> [!TIP]
>
> ### Solution
>
> **Statistical significance** refers to p \< α (typically 0.05),
> meaning results are unlikely due to chance.
>
> **Practical significance** refers to effect size - whether the result
> matters in the real world.
>
> Example: A drug may show statistically significant improvement (p \<
> 0.01) but only reduce symptoms by 1%, which may not be clinically
> meaningful.

## 14. Regression Assumptions \[10 pts\]

List regression assumptions and how to check them.

> [!TIP]
>
> ### Solution
>
> 1.  **Linearity** - check scatterplot
> 2.  **Independence** - study design, Durbin-Watson
> 3.  **Normality of residuals** - Q-Q plot
> 4.  **Homoscedasticity** - residual vs fitted plot
> 5.  **No multicollinearity** - VIF \< 10

# Multi-Part Problem (15 points)

## 15. Regression Analysis \[15 pts\]

A researcher collected data on study hours (X) and exam scores (Y). Use
the output below to answer the following parts.

| Statistic      | Value |
|----------------|-------|
| Slope (b₁)     | 2.5   |
| Intercept (b₀) | 45    |
| r              | 0.85  |
| n              | 30    |

### Part A: Prediction \[3 pts\]

What exam score would you predict for a student who studies 10 hours?

### Part B: Interpretation \[4 pts\]

Interpret the slope in context.

### Part C: Coefficient of Determination \[4 pts\]

Calculate and interpret R².

### Part D: Assessment \[4 pts\]

Is this a strong, moderate, or weak relationship? Justify your answer.
