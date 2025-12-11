# Claude Desktop Project Setup Guide
## Examark Quiz Builder Project

This guide shows you how to set up a Claude Desktop project for generating exams in examark format.

---

## Step-by-Step Setup

### 1. Create the Project

1. **Open Claude Desktop app**
2. Click **"Projects"** tab (left sidebar)
3. Click **"+ New Project"**
4. Name it: **"Examark Quiz Builder"**
5. Click **"Create"**

### 2. Upload Knowledge Files

1. Inside the project, click **"Add content"** button
2. Select **"Upload files"**
3. Upload these files from `~/.claude/skills/`:
   - ✅ `claude-desktop-exam-generation.md`
   - ✅ `claude-desktop-examark-formatting.md`
   - ✅ `examark-example-exam.md` (example reference)
   - ✅ `examark-quick-reference.md` (cheat sheet)

### 3. Set Project Instructions

Click **"Customize project"** and add these instructions:

```
You are an expert exam generator for Canvas LMS using the examark format.

RULES:
1. Always use examark syntax (see formatting knowledge file)
2. Mark correct answers with [x] (NEVER use **bold**)
3. Use explicit type markers: [MC], [TF], [Essay], etc.
4. Include points for every question: [2pts]
5. Use LaTeX for math formulas: $x^2$ or $$\frac{a}{b}$$

WORKFLOW:
1. Ask about subject, difficulty, question count
2. Generate questions following examark format
3. Validate: all questions have types, points, and correct answers marked
4. Provide both .md file and rendered preview

Default to statistics/math topics unless specified otherwise.
```

### 4. Test the Project

Start a conversation in the project:

**Test prompt:**
```
Generate a 5-question statistics quiz on descriptive statistics:
- 2 multiple choice
- 1 true/false
- 1 numerical
- 1 short answer

Include LaTeX formulas and feedback.
```

---

## Project Usage Patterns

### Quick Quiz Generation
```
"Create a 3-question quiz on [topic]"
```

### Specific Requirements
```
"Generate a 10-question exam:
- 5 MC on probability
- 3 TF on hypothesis testing
- 2 essay on interpretation
Points: 2pts for MC/TF, 10pts for essay"
```

### Convert Existing Questions
```
"Convert this to examark format:
[paste your questions]"
```

### Review and Fix
```
"Check this exam for examark syntax errors:
[paste exam content]"
```

---

## File Organization

### In Claude Desktop Project

```
Examark Quiz Builder/
├── Knowledge Files:
│   ├── exam-generation.md          (rules & patterns)
│   ├── examark-formatting.md       (syntax reference)
│   ├── example-exam.md             (full working example)
│   └── quick-reference.md          (cheat sheet)
│
└── Project Instructions            (workflow & defaults)
```

### Local Workflow

```bash
# 1. Generate exam in Claude Desktop → copy output

# 2. Save to file
cat > quiz.md << 'EOF'
[paste from Claude Desktop]
EOF

# 3. For Quarto users: create .qmd
cat > quiz.qmd << 'EOF'
---
title: "My Quiz"
format: exam-gfm
exam:
  qti: true
  default-points: 1
---
[paste questions from Claude Desktop]
EOF

# 4a. Convert markdown directly
examark quiz.md -o quiz.qti.zip

# 4b. Or render Quarto first
quarto render quiz.qmd --to exam-gfm
examark quiz.md -o quiz.qti.zip

# 5. Upload to Canvas
# Settings → Import Content → QTI .zip
```

---

## Tips for Best Results

### 1. Be Specific
❌ "Create a quiz"
✅ "Create a 5-question statistics quiz on mean/median/mode with 2pts each"

### 2. Request Validation
```
"Generate a quiz AND check it for examark syntax errors"
```

### 3. Iterate
```
"Add 3 more questions on correlation"
"Make question 2 harder"
"Add feedback to all MC questions"
```

### 4. Request Both Formats
```
"Provide the exam in:
1. Examark markdown (.md)
2. Quarto format (.qmd) with YAML header"
```

### 5. Subject Templates
```
# Statistics exam
"Use this structure:
Section 1: Descriptive (5 MC)
Section 2: Probability (3 TF)
Section 3: Inference (2 Essay)"

# Math exam
"Calculus quiz:
- 5 derivative problems (MC)
- 3 integral problems (Num)
- 2 limit problems (MC)
All with LaTeX notation"
```

---

## Common Issues & Solutions

### Issue: LaTeX not rendering
**Problem**: Used `**bold**` for correct answers
**Solution**: Change to `[x]` marker
```markdown
❌ a) **$2x$**
✅ a) $2x$ [x]
```

### Issue: Missing correct answers
**Problem**: Forgot to mark answers
**Solution**: Add `[x]` to correct options
```markdown
❌ a) Option A
✅ a) Option A [x]
```

### Issue: Inconsistent format
**Problem**: Mixed syntax styles
**Solution**: Stick to one format
```markdown
# Choose ONE:

✅ Clean syntax (recommended):
1. [MC] Question [2pts]

✅ Traditional syntax:
## 1. Question [2pts]
```

### Issue: Wrong type marker
**Problem**: Used unsupported marker
**Solution**: Use standard markers
```markdown
❌ [MultipleChoice]
✅ [MC]

❌ [T/F]
✅ [TF]
```

---

## Advanced Features

### 1. Dynamic Questions (Request R Code)
```
"Generate a statistics quiz with R code that randomizes:
- Dataset values
- Question numbers
- Calculated answers"
```

### 2. Question Banks
```
"Create a 50-question bank on probability:
- Organized by difficulty (easy/medium/hard)
- Ready for Canvas import
- Randomizable for different exam versions"
```

### 3. Answer Key Generation
```
"Generate the exam AND a separate answer key with explanations"
```

### 4. Multi-Format Output
```
"Provide this exam in:
1. Examark .md (for Canvas)
2. Quarto .qmd (for preview)
3. Plain text (for printing)"
```

---

## Sharing the Project

### Export Project (for colleagues)
1. In project → **Settings** → **Export**
2. Share the exported file
3. Colleagues import it to get same setup

### Share Knowledge Files Only
```bash
# Bundle skills for sharing
cd ~/.claude/skills
tar -czf examark-skills.tar.gz claude-desktop-*.md examark-*.md

# Send to colleague, they extract to their ~/.claude/skills/
```

---

## Maintenance

### Update Skills
When examark format changes:
1. Update knowledge files in project
2. Re-upload to refresh project knowledge
3. Test with sample generation

### Backup
```bash
# Backup project files
cp ~/.claude/skills/claude-desktop-*.md ~/Dropbox/claude-skills/
cp ~/.claude/skills/examark-*.md ~/Dropbox/claude-skills/
```

---

## Quick Start Checklist

- [ ] Created "Examark Quiz Builder" project in Claude Desktop
- [ ] Uploaded 4 knowledge files (generation, formatting, example, reference)
- [ ] Set project instructions
- [ ] Tested with sample quiz generation
- [ ] Verified examark syntax in output
- [ ] Successfully converted to QTI with examark CLI
- [ ] Uploaded to Canvas and verified import

**You're ready to generate exams!** 🎉

---

## Support Resources

- **Examark Docs**: https://data-wise.github.io/examark/
- **Example Templates**: `templates/quarto/` in examark repo
- **CLI Reference**: `examark --help`
- **Issue Tracker**: https://github.com/Data-Wise/examark/issues
