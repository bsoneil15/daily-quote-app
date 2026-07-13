import { quotes, authors, type Author, type InsertAuthor, type Quote, type InsertQuote, type DailyQuote } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  countQuotes(): Promise<number>;
  getDailyQuote(theme: string): Promise<DailyQuote | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class DatabaseStorage implements IStorage {
  async countQuotes(): Promise<number> {
    try {
      const result = await db.select({ count: sql<number>`count(*)` }).from(quotes);
      return result[0]?.count || 0;
    } catch (error) {
      console.error('Error counting quotes:', error);
      throw new Error('Failed to count quotes');
    }
  }

  async getDailyQuote(theme: string): Promise<DailyQuote | undefined> {
    try {
      const result = await db.select()
        .from(quotes)
        .where(eq(quotes.theme, theme))
        .innerJoin(authors, eq(quotes.authorId, authors.id))
        .orderBy(sql`RANDOM()`)  // This ensures we get a random quote
        .limit(1);

      if (result.length === 0) return undefined;

      const row = result[0];
      return {
        quote: {
          id: row.quotes.id,
          authorId: row.quotes.authorId,
          text: row.quotes.text,
          theme: row.quotes.theme,
        },
        author: {
          id: row.authors.id,
          name: row.authors.name,
          imageUrl: row.authors.imageUrl,
          bio: row.authors.bio,
        }
      };
    } catch (error) {
      console.error(`Error getting daily quote for theme ${theme}:`, error);
      throw new Error('Failed to fetch daily quote');
    }
  }

  async createAuthor(author: InsertAuthor): Promise<Author> {
    try {
      const [result] = await db.insert(authors).values(author).returning();
      if (!result) {
        throw new Error('Failed to create author: No result returned');
      }
      return result;
    } catch (error) {
      console.error('Error creating author:', error);
      throw new Error('Failed to create author');
    }
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    try {
      const [result] = await db.insert(quotes).values(quote).returning();
      if (!result) {
        throw new Error('Failed to create quote: No result returned');
      }
      return result;
    } catch (error) {
      console.error('Error creating quote:', error);
      throw new Error('Failed to create quote');
    }
  }
}

export const storage = new DatabaseStorage();