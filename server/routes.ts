import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { authors, quotes } from "@shared/data";
import type { ThemeType, DailyQuote } from "@shared/schema";

function getDailyQuotes(): Record<ThemeType, DailyQuote> {
  // Simple date-based selection - changes daily
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const themes: ThemeType[] = ["leadership", "focus", "growth"];
  const result = {} as Record<ThemeType, DailyQuote>;

  themes.forEach((theme) => {
    const themeQuotes = quotes.filter((q) => q.theme === theme);
    if (themeQuotes.length === 0) {
      throw new Error(`No quotes found for theme: ${theme}`);
    }

    const quoteIndex = dayOfYear % themeQuotes.length;
    const quote = themeQuotes[quoteIndex];
    const author = authors.find((a) => a.id === quote.authorId);

    if (!quote || !author) {
      throw new Error(`Failed to find quote or author for theme: ${theme}`);
    }

    result[theme] = {
      quote,
      author,
    };
  });

  return result;
}

export async function registerRoutes(app: Express) {
  app.get("/api/quotes/daily", (_req, res) => {
    try {
      const dailyQuotes = getDailyQuotes();
      res.json(dailyQuotes);
    } catch (error) {
      console.error('Error getting daily quotes:', error);
      res.status(500).json({ 
        message: 'Failed to fetch daily quotes',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}