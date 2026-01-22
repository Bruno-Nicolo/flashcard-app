// Card represents a flashcard with spaced repetition data
export interface Card {
  id: string;
  title: string;
  content: string; // Markdown content
  deckId: string;
  nextDueDate: Date;
  lastReviewedDate: Date | null;
  lastScore: 1 | 2 | 3 | 4 | 5 | null; // User's recall rating
  createdAt: Date;
  updatedAt: Date;
}

// Deck represents a folder containing cards
export interface Deck {
  id: string;
  name: string;
  parentId: string | null; // For nested deck structure
  createdAt: Date;
  updatedAt: Date;
}

// User represents the authenticated user
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

// View mode for Due Today page
export type DueTodayViewMode = "focus" | "list";

// Sort options for tables
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

// Theme preference
export type Theme = "light" | "dark" | "system";
