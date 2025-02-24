import type { InsertAuthor, InsertQuote } from "./schema";

export const authors: InsertAuthor[] = [
  {
    id: 1,
    name: "Eleanor Roosevelt",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Eleanor_Roosevelt_portrait_1933.jpg",
    bio: "Former First Lady, diplomat and activist"
  },
  {
    id: 2,
    name: "Marie Curie",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.png",
    bio: "Nobel Prize-winning physicist and chemist"
  },
  {
    id: 3,
    name: "Maya Angelou",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Maya_Angelou_2.jpg",
    bio: "Poet, memoirist, and civil rights activist"
  }
];

export const quotes: InsertQuote[] = [
  // Leadership quotes
  {
    id: 1,
    authorId: 1,
    text: "No one can make you feel inferior without your consent.",
    theme: "leadership"
  },
  {
    id: 2,
    authorId: 2,
    text: "Nothing in life is to be feared, it is only to be understood.",
    theme: "leadership"
  },
  {
    id: 3,
    authorId: 3,
    text: "Nothing will work unless you do.",
    theme: "leadership"
  },
  // Focus quotes
  {
    id: 4,
    authorId: 1,
    text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    theme: "focus"
  },
  {
    id: 5,
    authorId: 2,
    text: "One never notices what has been done; one can only see what remains to be done.",
    theme: "focus"
  },
  {
    id: 6,
    authorId: 3,
    text: "Success is liking yourself, liking what you do, and liking how you do it.",
    theme: "focus"
  },
  // Growth quotes
  {
    id: 7,
    authorId: 1,
    text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.",
    theme: "growth"
  },
  {
    id: 8,
    authorId: 2,
    text: "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.",
    theme: "growth"
  },
  {
    id: 9,
    authorId: 3,
    text: "You can't really know where you are going until you know where you have been.",
    theme: "growth"
  }
];

export const themeBackgrounds = {
  leadership: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  focus: "https://images.unsplash.com/photo-1489533119213-66a5cd877091",
  growth: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d"
};

export const themeColors = {
  leadership: {
    primary: "bg-blue-600",
    secondary: "bg-blue-100",
    text: "text-blue-900"
  },
  focus: {
    primary: "bg-slate-800",
    secondary: "bg-slate-100", 
    text: "text-slate-900"
  },
  growth: {
    primary: "bg-emerald-600",
    secondary: "bg-emerald-100",
    text: "text-emerald-900"
  }
};