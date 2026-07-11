import { pgTable, text, serial, integer, varchar } from "drizzle-orm/pg-core";
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
  authorId: integer("author_id").references(() => authors.id),
  text: text("text").notNull(),
  theme: varchar("theme", { length: 20 }).notNull(),
});

export const insertAuthorSchema = createInsertSchema(authors).omit({ id: true });
export const insertQuoteSchema = createInsertSchema(quotes).omit({ id: true });

export type Author = typeof authors.$inferSelect;
export type Quote = typeof quotes.$inferSelect;
export type InsertAuthor = z.infer<typeof insertAuthorSchema>;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;

export type DailyQuote = {
  quote: Quote;
  author: Author;
};
