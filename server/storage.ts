import { quotes, authors, subscribers, type Author, type InsertAuthor, type Quote, type InsertQuote, type DailyQuote, type InsertSubscriber, type Subscriber } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDailyQuote(theme: string): Promise<DailyQuote | undefined>;
  createAuthor(author: InsertAuthor): Promise<Author>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getDailyQuote(theme: string): Promise<DailyQuote | undefined> {
    const result = await db.select()
      .from(quotes)
      .where(eq(quotes.theme, theme))
      .innerJoin(authors, eq(quotes.authorId, authors.id))
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
  }

  async createAuthor(author: InsertAuthor): Promise<Author> {
    const [result] = await db.insert(authors).values(author).returning();
    return result;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [result] = await db.insert(quotes).values(quote).returning();
    return result;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [result] = await db.insert(subscribers).values(subscriber).returning();
    return result;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const [result] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return result;
  }
}

export const storage = new DatabaseStorage();