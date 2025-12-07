
import { describe, it, expect } from 'vitest';
import { generateItem } from '../src/generator/qti21';
import type { Question } from '../src/parser/types';

describe('XML Generator Logic', () => {
  it('should handle sequential ID generation correctly even if parser IDs are non-sequential', () => {
    // Simulate a case where parser yields IDs 'a' and 'c' (e.g. user skipped 'b' or used bullets)
    // Actually, parser logic for bullets uses length, so it's sequential. 
    // Parser logic for "1) ... 3) ..." uses parsed number.
    const question: Question = {
      id: 1,
      type: 'multiple_choice',
      stem: 'Question',
      points: 1,
      options: [
        { id: 'a', text: 'Option 1', isCorrect: false },
        { id: 'c', text: 'Option 3 (Correct)', isCorrect: true } // Parser gave this ID 'c'
      ]
    };

    const xml = generateItem(question, 'Quiz');
    
    // We expect the choices to be identified as A and B (sequential)
    expect(xml).toContain('<simpleChoice identifier="A">Option 1</simpleChoice>');
    expect(xml).toContain('<simpleChoice identifier="B">Option 3 (Correct)</simpleChoice>');
    
    // BUT we expect the correct response to point to B (the 2nd option), not C (the ID)
    // Current implementation likely does: <value>C</value> -> Mismatch!
    expect(xml).toContain('<value>B</value>'); 
    expect(xml).not.toContain('<value>C</value>');
  });
});
