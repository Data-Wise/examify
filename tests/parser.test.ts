
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
});
