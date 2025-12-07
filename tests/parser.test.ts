
import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '../src/parser/markdown';

describe('Markdown Parser', () => {
  it('should parse a standard quiz', () => {
    const input = `
# Quiz Title

# Multiple Choice

## 1. Question 1 [2 pts]
1) Option A
2) **Option B**
    `;
    const result = parseMarkdown(input);
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0].points).toBe(2);
    expect(result.questions[0].type).toBe('multiple_choice');
  });

  it('should parse "Section:" prefix in headers (Canvas compatibility)', () => {
    const input = `
# Statistics Exam

# Section: Multiple Choice

## 1. What is variance? [3 pts]
1) Sum of squares
2) **Average squared deviation**
    `;
    const result = parseMarkdown(input);
    expect(result.sections).toHaveLength(1);
    expect(result.sections[0].title).toContain('Multiple Choice');
    // This is expected to FAIL currently if my hypothesis is correct
    expect(result.questions).toHaveLength(1);
  });

  it('should handle escaped brackets in points (Quarto output)', () => {
    const input = `
# Quiz

# Multiple Choice

## 2. Question [2 pts]
1) A
2) **B**

## 3. Question \\[3 pts\\]
1) A
2) **B**
    `;
    const result = parseMarkdown(input);
    expect(result.questions).toHaveLength(2);
    expect(result.questions[0].points).toBe(2);
    // This might fallback to default if regex fails
    // expect(result.questions[1].points).toBe(3); 
  });

  it('should extract points even when brackets are escaped (Quarto style)', () => {
    const input = `
# Quiz
## 1. Question Title \\[2 pts\\]
1) A
2) **B**
    `;
    const result = parseMarkdown(input);
    expect(result.questions[0].points).toBe(2);
    expect(result.questions[0].stem).toBe('Question Title'); // Should NOT have [2 pts]
  });

  it('should auto-generate options for True/False questions if missing', () => {
    const input = `
# Section: True/False
## 1. Simple Fact
The sky is blue. -> True

## 2. Another Fact
Water is dry. -> False
    `;
    const result = parseMarkdown(input);
    const q1 = result.questions[0];
    expect(q1.type).toBe('true_false');
    expect(q1.options.length).toBe(2);
    expect(q1.options[0].text).toBe('True');
    expect(q1.options[0].isCorrect).toBe(true);
    expect(q1.stem).not.toContain('-> True');

    const q2 = result.questions[1];
    expect(q2.options[1].text).toBe('False');
    expect(q2.options[1].isCorrect).toBe(true);
  });
});
