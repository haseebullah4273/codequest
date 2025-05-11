import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const codingProblems = pgTable("coding_problems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  language: text("language").notNull(),
  difficulty: text("difficulty").notNull(),
  topics: text("topics").array().notNull(),
  hints: text("hints").array().notNull(),
  solution: text("solution").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertCodingProblemSchema = createInsertSchema(codingProblems).pick({
  title: true,
  description: true,
  language: true,
  difficulty: true,
  topics: true,
  hints: true,
  solution: true,
  createdAt: true,
});

export const savedProblems = pgTable("saved_problems", {
  id: serial("id").primaryKey(),
  problemId: integer("problem_id").notNull(),
  userId: text("user_id").notNull(),
  savedAt: text("saved_at").notNull(),
});

export const insertSavedProblemSchema = createInsertSchema(savedProblems).pick({
  problemId: true,
  userId: true,
  savedAt: true,
});

export type InsertCodingProblem = z.infer<typeof insertCodingProblemSchema>;
export type CodingProblem = typeof codingProblems.$inferSelect;
export type InsertSavedProblem = z.infer<typeof insertSavedProblemSchema>;
export type SavedProblem = typeof savedProblems.$inferSelect;

// Type for the Together API request
export const togetherAIPromptSchema = z.object({
  language: z.string(),
  topics: z.array(z.string()),
  difficulty: z.array(z.string()),
  customInstructions: z.string().optional(),
  count: z.number().min(1).max(10),
  learningFocus: z.enum([
    "data-structures-algorithms", 
    "job-preparation", 
    "basic-learning", 
    "framework-specific"
  ]).optional(),
  frameworkName: z.string().optional()
});

export type TogetherAIPrompt = z.infer<typeof togetherAIPromptSchema>;
