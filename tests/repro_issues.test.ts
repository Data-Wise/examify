
import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '../src/parser/markdown';

describe('Reproduction of User Issues', () => {
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

  it('should NOT treat "## 1. Section Name" as a question if it looks like a header?', () => {
    // Testing the hypothesis that user uses H2 for sections
    const input = `
# Quiz
## 1. Main Section
## 2. Actual Question [1 pt]
1) A
2) **B**
    `;
    const result = parseMarkdown(input);
    // If "Main Section" is parsed as a question, we have 2 questions.
    // Ideally we want 1 question, but currently it's likely 2.
    // If it is 2, confirm that's what's happening.
    expect(result.questions.length).toBe(2);
    expect(result.questions[0].stem).toBe('Main Section');
  });
});
