# Exam Management Best Practices

Managing a large bank of questions can become difficult. Here are some strategies to keep your assessments organized and maintainable.

## File Organization

### Atomic Files vs. Monoliths

For small courses, a single `midterm.md` file might be sufficient. However, for larger courses, we recommend breaking questions down by topic.

**Recommended Structure:**

```text
course-101/
├── topics/
│   ├── 01-intro/
│   │   ├── questions.md
│   │   └── assets/
│   ├── 02-statistics/
│   │   ├── questions.md
│   │   └── assets/
│   └── 03-regression/
│       ├── questions.md
│       └── assets/
├── exams/
│   ├── midterm-2023.md
│   └── final-2023.md
└── dist/
    ├── midterm-2023.qti.zip
    └── final-2023.qti.zip
```

You can then stitch files together manually or using a simple script before running Examify.

## Version Control

Treat your exams like code.

1. **Use Git**: Track changes to your questions over time.
2. **Branching**: Create a branch for each semester's updates (e.g., `fall-2024`).
3. **Tags**: Tag releases when an exam is finalized and administered.

## Question Reuse

### Parameterization

Instead of hardcoding values, use variables if you are using Quarto/RMarkdown (see the [Quarto Tutorial](quarto.md)). This allows you to generate infinite versions of the same question.

### Question Banks

Examify generates QTI files that import as **Question Banks** in Canvas. This is by design.

1. Import your `topic-01.qti.zip`
2. It appears as "topic-01" in Canvas Question Banks
3. In your Canvas Quiz, select "Find Questions" and pull from this bank

This allows you to maintain clean banks in Git and assemble quizzes dynamically in Canvas.

## Quality Assurance

### Pre-Flight Checks

Always run the `emulate-canvas` command before uploading. It catches 95% of common errors (missing answers, broken images, etc.).

```bash
examify emulate-canvas final-exam.qti.zip
```

### Peer Review

Since your exams are text files, you can use GitHub Pull Requests to have TAs or colleagues review questions before they go live!
