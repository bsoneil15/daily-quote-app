
import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { authors, quotes } from "@shared/data";
import type { ThemeType, DailyQuote } from "@shared/schema";

/**
 * Generates daily quotes for each theme based on the day of year
 */
function getDailyQuotes(): Record<ThemeType, DailyQuote> {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
    (1000 * 60 * 60 * 24)
  );

  const themes: ThemeType[] = ["leadership", "focus", "growth"];
  const result = {} as Record<ThemeType, DailyQuote>;

  for (const theme of themes) {
    // Get quotes for this theme
    const themeQuotes = quotes.filter(q => q.theme === theme);
    
    if (!themeQuotes.length) {
      throw new Error(`No quotes found for theme: ${theme}`);
    }

    // Select quote based on day of year
    const quoteIndex = dayOfYear % themeQuotes.length;
    const quote = themeQuotes[quoteIndex];
    
    if (!quote) {
      throw new Error(`Failed to find quote for theme: ${theme}`);
    }
    
    // Find matching author
    const author = authors.find(a => a.id === quote.authorId);

    if (!author) {
      throw new Error(`Failed to find author with ID ${quote.authorId} for theme: ${theme}`);
    }

    result[theme] = { quote, author };
  }

  return result;
}

export async function registerRoutes(app: Express) {
  // Daily quotes endpoint
  app.get("/api/quotes/daily", (_req, res) => {
    try {
      const dailyQuotes = getDailyQuotes();
      if (!dailyQuotes || Object.keys(dailyQuotes).length === 0) {
        throw new Error('No quotes available');
      }
      res.json(dailyQuotes);
    } catch (error) {
      console.error('Error getting daily quotes:', error);
      res.status(error instanceof Error && error.message === 'No quotes available' ? 404 : 500)
        .json({ 
          message: 'Failed to fetch daily quotes',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
  });

  return createServer(app);
}
