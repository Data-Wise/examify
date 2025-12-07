/**
 * Type definitions for parsed questions
 */

export type QuestionType = 
  | 'multiple_choice'
  | 'multiple_answers'    // Multiple correct answers allowed
  | 'true_false'
  | 'essay'
  | 'short_answer'
  | 'fill_in_blank'
  | 'fill_in_multiple_blanks'  // Multiple blanks in one question
  | 'matching'            // Match items from two lists
  | 'numerical'           // Numeric answer with tolerance
  | 'calculated'          // Formula-based with variables;

export interface AnswerOption {
  id: string;          // a, b, c, d, etc.
  text: string;        // Answer text (may contain LaTeX)
  isCorrect: boolean;  // Whether this is the correct answer
}

export interface Question {
  id: number;
  type: QuestionType;
  stem: string;           // Question text (may contain LaTeX)
  options: AnswerOption[]; // Empty for essay/short answer
  points: number;
  section?: string;        // Section this question belongs to
  instructions?: string;   // Optional per-question instructions
  images?: string[];       // Paths to images referenced in the question
}

export interface Section {
  id: string;
  title: string;
  instructions?: string;
  questionIds: number[];
}

export interface ParsedQuiz {
  title: string;           // Pool/Bank name
  defaultPoints: number;
  sections: Section[];
  questions: Question[];
}

/**
 * Slugify a string for use as an identifier
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}
