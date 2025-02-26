import type { InsertAuthor, InsertQuote } from "./schema";

export const authors: InsertAuthor[] = [
  {
    id: 1,
    name: "Napoleon Bonaparte",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    bio: "French military commander and emperor"
  },
  {
    id: 2,
    name: "Seneca",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/Seneca.JPG",
    bio: "Roman Stoic philosopher and statesman"
  },
  {
    id: 3,
    name: "Plato",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg",
    bio: "Classical Greek philosopher"
  },
  {
    id: 4,
    name: "Marie Curie",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.png",
    bio: "Nobel Prize-winning physicist and chemist"
  },
  {
    id: 5,
    name: "Ernest Shackleton",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Shackleton_in_1909.jpg/800px-Shackleton_in_1909.jpg",
    bio: "Antarctic explorer and exemplary leader"
  },
  {
    id: 6,
    name: "Teddy Roosevelt",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/President_Theodore_Roosevelt%2C_1904.jpg",
    bio: "26th President of the United States and conservationist"
  },
  {
    id: 7,
    name: "Marcus Aurelius",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Marcus_Aurelius_Glyptothek_Munich.jpg",
    bio: "Roman Emperor and Stoic philosopher"
  }
];

export const quotes: InsertQuote[] = [
  // Leadership quotes
  {
    id: 1,
    authorId: 1,
    text: "A leader is a dealer in hope.",
    theme: "leadership"
  },
  {
    id: 2,
    authorId: 1,
    text: "The battlefield is a scene of constant chaos. The winner will be the one who controls that chaos, both his own and the enemy's.",
    theme: "leadership"
  },
  {
    id: 3,
    authorId: 2,
    text: "A great leader never sets out to be a leader. He sets out to make a difference.",
    theme: "leadership"
  },
  {
    id: 4,
    authorId: 3,
    text: "The measure of a man is what he does with power.",
    theme: "leadership"
  },
  {
    id: 5,
    authorId: 3,
    text: "Wise men speak because they have something to say; fools because they have to say something.",
    theme: "leadership"
  },
  {
    id: 6,
    authorId: 5,
    text: "Optimism is true moral courage.",
    theme: "leadership"
  },
  {
    id: 7,
    authorId: 6,
    text: "The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint to keep from meddling while they do it.",
    theme: "leadership"
  },
  // Focus quotes
  {
    id: 8,
    authorId: 1,
    text: "Take time to deliberate, but when the time for action comes, stop thinking and go in.",
    theme: "focus"
  },
  {
    id: 9,
    authorId: 2,
    text: "He who is everywhere is nowhere.",
    theme: "focus"
  },
  {
    id: 10,
    authorId: 3,
    text: "Better a little which is well done, than a great deal imperfectly.",
    theme: "focus"
  },
  {
    id: 11,
    authorId: 4,
    text: "One never notices what has been done; one can only see what remains to be done.",
    theme: "focus"
  },
  {
    id: 12,
    authorId: 7,
    text: "Concentrate every minute on doing what's in front of you with precise and genuine seriousness.",
    theme: "focus"
  },
  {
    id: 13,
    authorId: 7,
    text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    theme: "focus"
  },
  // Growth quotes
  {
    id: 14,
    authorId: 1,
    text: "Impossible is a word to be found only in the dictionary of fools.",
    theme: "growth"
  },
  {
    id: 15,
    authorId: 2,
    text: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.",
    theme: "growth"
  },
  {
    id: 16,
    authorId: 4,
    text: "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.",
    theme: "growth"
  },
  {
    id: 17,
    authorId: 6,
    text: "Do what you can, with what you have, where you are.",
    theme: "growth"
  },
  {
    id: 18,
    authorId: 7,
    text: "The happiness of your life depends upon the quality of your thoughts.",
    theme: "growth"
  },
  {
    id: 19,
    authorId: 7,
    text: "Waste no more time arguing about what a good man should be. Be one.",
    theme: "growth"
  }
];

export const themeBackgrounds = {
  leadership: "https://images.unsplash.com/photo-1507842217343-583bb7270b66", // Library with books
  focus: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5", // Misty forest 
  growth: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e" // Sunlight through trees
};

export const themeColors = {
  leadership: {
    primary: "bg-emerald-700 hover:bg-emerald-800",
    secondary: "bg-emerald-100 hover:bg-emerald-200", 
    text: "text-emerald-900"
  },
  focus: {
    primary: "bg-blue-700 hover:bg-blue-800",
    secondary: "bg-blue-100 hover:bg-blue-200", 
    text: "text-blue-900"
  },
  growth: {
    primary: "bg-amber-900 hover:bg-amber-950",
    secondary: "bg-amber-100 hover:bg-amber-200",
    text: "text-amber-900"
  }
};