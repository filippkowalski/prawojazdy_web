/**
 * Database wrapper for SQL.js
 * Used during build time to query SQLite databases
 */

import initSqlJs, { Database } from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';
import { Question, Answer, Category, QuestionWithAnswers, Locale } from './types';

let SQL: Awaited<ReturnType<typeof initSqlJs>> | null = null;
const databaseCache: Map<Locale, Database> = new Map();

/**
 * Initialize SQL.js (lazy loading)
 */
async function initSQL() {
  if (!SQL) {
    // Use local SQL.js files from node_modules
    SQL = await initSqlJs({
      locateFile: (file) => {
        // In Node.js environment (build time), use local file from node_modules
        if (typeof window === 'undefined') {
          return path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file);
        }
        // In browser (if needed), use CDN
        return `https://sql.js.org/dist/${file}`;
      },
    });
  }
  return SQL;
}

/**
 * Get database for a specific locale
 */
export async function getDatabase(locale: Locale): Promise<Database> {
  // Check cache first
  if (databaseCache.has(locale)) {
    return databaseCache.get(locale)!;
  }

  // Initialize SQL.js
  const SQL = await initSQL();

  // Load database file
  const dbPath = path.join(process.cwd(), 'public', 'databases', `database_${locale}.db`);

  if (!fs.existsSync(dbPath)) {
    throw new Error(`Database file not found: ${dbPath}`);
  }

  const buffer = fs.readFileSync(dbPath);
  const db = new SQL.Database(buffer);

  // Cache the database
  databaseCache.set(locale, db);

  return db;
}

/**
 * Get all categories for a locale
 */
export async function getCategories(locale: Locale): Promise<Category[]> {
  const db = await getDatabase(locale);
  const result = db.exec('SELECT id, name FROM Categories ORDER BY id');

  if (result.length === 0) {
    return [];
  }

  return result[0].values.map((row) => ({
    id: row[0] as number,
    name: row[1] as string,
  }));
}

/**
 * Get category by ID
 */
export async function getCategory(locale: Locale, categoryId: number): Promise<Category | null> {
  const db = await getDatabase(locale);
  const result = db.exec('SELECT id, name FROM Categories WHERE id = ?', [categoryId]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0].values[0];
  return {
    id: row[0] as number,
    name: row[1] as string,
  };
}

/**
 * Get all questions for a locale
 */
export async function getAllQuestions(locale: Locale): Promise<Question[]> {
  const db = await getDatabase(locale);
  const result = db.exec(`
    SELECT
      id,
      category_id,
      media,
      question,
      points,
      description,
      explanation,
      correct_answer,
      type,
      official_number,
      license_categories
    FROM Questions
    ORDER BY id
  `);

  if (result.length === 0) {
    return [];
  }

  return result[0].values.map((row) => ({
    id: row[0] as number,
    category_id: row[1] as number,
    media: row[2] as string | null,
    question: row[3] as string,
    points: row[4] as number,
    description: row[5] as string | null,
    explanation: row[6] as string | null,
    correct_answer: row[7] as number,
    type: row[8] as string,
    official_number: row[9] as number | null,
    license_categories: row[10] as string | null,
  }));
}

/**
 * Get question by ID
 */
export async function getQuestion(locale: Locale, questionId: number): Promise<Question | null> {
  const db = await getDatabase(locale);
  const result = db.exec(`
    SELECT
      id,
      category_id,
      media,
      question,
      points,
      description,
      explanation,
      correct_answer,
      type,
      official_number,
      license_categories
    FROM Questions
    WHERE id = ?
  `, [questionId]);

  if (result.length === 0 || result[0].values.length === 0) {
    return null;
  }

  const row = result[0].values[0];
  return {
    id: row[0] as number,
    category_id: row[1] as number,
    media: row[2] as string | null,
    question: row[3] as string,
    points: row[4] as number,
    description: row[5] as string | null,
    explanation: row[6] as string | null,
    correct_answer: row[7] as number,
    type: row[8] as string,
    official_number: row[9] as number | null,
    license_categories: row[10] as string | null,
  };
}

/**
 * Get answers for a question
 */
export async function getAnswers(locale: Locale, questionId: number): Promise<Answer[]> {
  const db = await getDatabase(locale);
  const result = db.exec(`
    SELECT id, question_id, answer, position
    FROM Answers
    WHERE question_id = ?
    ORDER BY position
  `, [questionId]);

  if (result.length === 0) {
    return [];
  }

  return result[0].values.map((row) => ({
    id: row[0] as number,
    question_id: row[1] as number,
    answer: row[2] as string,
    position: row[3] as number,
  }));
}

/**
 * Get question with answers and category
 */
export async function getQuestionWithAnswers(
  locale: Locale,
  questionId: number
): Promise<QuestionWithAnswers | null> {
  const question = await getQuestion(locale, questionId);
  if (!question) {
    return null;
  }

  const [answers, category] = await Promise.all([
    getAnswers(locale, questionId),
    getCategory(locale, question.category_id),
  ]);

  if (!category) {
    return null;
  }

  return {
    ...question,
    answers,
    category,
  };
}

/**
 * Get all questions with answers for a locale
 */
export async function getAllQuestionsWithAnswers(locale: Locale): Promise<QuestionWithAnswers[]> {
  const questions = await getAllQuestions(locale);
  const categories = await getCategories(locale);
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const questionsWithAnswers = await Promise.all(
    questions.map(async (question) => {
      const answers = await getAnswers(locale, question.id);
      const category = categoryMap.get(question.category_id);

      if (!category) {
        throw new Error(`Category ${question.category_id} not found for question ${question.id}`);
      }

      return {
        ...question,
        answers,
        category,
      };
    })
  );

  return questionsWithAnswers;
}

/**
 * Get questions by category ID
 */
export async function getQuestionsByCategory(
  locale: Locale,
  categoryId: number
): Promise<QuestionWithAnswers[]> {
  const db = await getDatabase(locale);
  const result = db.exec(`
    SELECT
      id,
      category_id,
      media,
      question,
      points,
      description,
      explanation,
      correct_answer,
      type,
      official_number,
      license_categories
    FROM Questions
    WHERE category_id = ?
    ORDER BY id
  `, [categoryId]);

  if (result.length === 0) {
    return [];
  }

  const questions: Question[] = result[0].values.map((row) => ({
    id: row[0] as number,
    category_id: row[1] as number,
    media: row[2] as string | null,
    question: row[3] as string,
    points: row[4] as number,
    description: row[5] as string | null,
    explanation: row[6] as string | null,
    correct_answer: row[7] as number,
    type: row[8] as string,
    official_number: row[9] as number | null,
    license_categories: row[10] as string | null,
  }));

  const category = await getCategory(locale, categoryId);
  if (!category) {
    return [];
  }

  const questionsWithAnswers = await Promise.all(
    questions.map(async (question) => {
      const answers = await getAnswers(locale, question.id);
      return {
        ...question,
        answers,
        category,
      };
    })
  );

  return questionsWithAnswers;
}

/**
 * Close all database connections (cleanup)
 */
export function closeDatabases() {
  databaseCache.forEach((db) => db.close());
  databaseCache.clear();
}
