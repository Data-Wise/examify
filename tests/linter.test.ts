
import { describe, it, expect } from 'vitest';
import { lintMarkdown } from '../src/diagnostic/linter';

describe('Linter', () => {
  it('should pass for a valid quiz', () => {
    const input = `
# Quiz Title
## 1. Valid Question [1 pt]
1) Option A
2) **Option B**
    `;
    const errors = lintMarkdown(input);
    expect(errors).toHaveLength(0);
  });

  it('should report error for empty quiz', () => {
    const errors = lintMarkdown('');
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('No questions found');
  });

  it('should report missing correct answer', () => {
    const input = `
# Quiz
## 1. Invalid Question
1) A
2) B
    `;
    const errors = lintMarkdown(input);
    expect(errors.some(e => e.message.includes('No correct answer marked'))).toBe(true);
  });

  it('should report insufficient options', () => {
    const input = `
# Quiz
## 1. Bad Question
1) **A**
    `;
    const errors = lintMarkdown(input);
    expect(errors.some(e => e.message.includes('must have at least 2 options'))).toBe(true);
  });

  it('should report duplicate question IDs', () => {
       const input = `
# Quiz
## 1. Question A [1 pt]
1) A
2) **B**

## 1. Question B [1 pt] (Duplicate ID)
1) A
2) **B**
    `;
    // Note: Parser might auto-increment IDs if not strictly parsed, 
    // but our parser respects "## 1." as ID 1.
    const errors = lintMarkdown(input);
    expect(errors.some(e => e.message.includes('Duplicate Question ID found: 1'))).toBe(true);
  });
});
