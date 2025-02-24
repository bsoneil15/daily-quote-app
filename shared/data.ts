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
    imageUrl: "/marie-curie.webp",
    bio: "Nobel Prize-winning physicist and chemist"
  },
  {
    id: 3,
    name: "Theodore Roosevelt",
    imageUrl: "/teddy-roosevelt.webp",
    bio: "26th President of the United States, conservationist and author"
  },
  {
    id: 4,
    name: "Seneca",
    imageUrl: "/seneca.webp",
    bio: "Roman Stoic philosopher, statesman, and dramatist"
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
    authorId: 3,
    text: "Speak softly and carry a big stick; you will go far.",
    theme: "leadership"
  },
  {
    id: 3,
    authorId: 4,
    text: "A good leader must show the way by example rather than by force.",
    theme: "leadership"
  },
  // Focus quotes
  {
    id: 4,
    authorId: 2,
    text: "One never notices what has been done; one can only see what remains to be done.",
    theme: "focus"
  },
  {
    id: 5,
    authorId: 3,
    text: "Keep your eyes on the stars, and your feet on the ground.",
    theme: "focus"
  },
  {
    id: 6,
    authorId: 4,
    text: "It is not that we have a short time to live, but that we waste a lot of it.",
    theme: "focus"
  },
  // Growth quotes
  {
    id: 7,
    authorId: 2,
    text: "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.",
    theme: "growth"
  },
  {
    id: 8,
    authorId: 3,
    text: "Nothing worth having comes easy. The only person who never makes mistakes is the person who never does anything.",
    theme: "growth"
  },
  {
    id: 9,
    authorId: 4,
    text: "As long as you live, keep learning how to live.",
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