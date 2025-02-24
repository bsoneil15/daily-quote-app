import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export type ThemeType = "leadership" | "focus" | "growth";

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  bio: text("bio").notNull(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  authorId: serial("author_id").references(() => authors.id),
  text: text("text").notNull(),
  theme: varchar("theme", { length: 20 }).notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  preferences: text("preferences").default("{}"),
});

export const insertAuthorSchema = createInsertSchema(authors);
export const insertQuoteSchema = createInsertSchema(quotes);
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ createdAt: true });

export type Author = typeof authors.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export type DailyQuote = {
  quote: Quote;
  author: Author;
};