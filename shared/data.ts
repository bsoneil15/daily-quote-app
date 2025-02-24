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
    authorId: 2,
    text: "A great leader never sets out to be a leader. He sets out to make a difference.",
    theme: "leadership"
  },
  {
    id: 3,
    authorId: 3,
    text: "The measure of a man is what he does with power.",
    theme: "leadership"
  },
  {
    id: 4,
    authorId: 4,
    text: "Nothing in life is to be feared; it is only to be understood.",
    theme: "leadership"
  },
  {
    id: 5,
    authorId: 5,
    text: "Difficulties are just things to overcome, after all.",
    theme: "leadership"
  },
  // Focus quotes
  {
    id: 6,
    authorId: 1,
    text: "Take time to deliberate, but when the time for action comes, stop thinking and go in.",
    theme: "focus"
  },
  {
    id: 7,
    authorId: 2,
    text: "He who is everywhere is nowhere.",
    theme: "focus"
  },
  {
    id: 8,
    authorId: 3,
    text: "Better a little which is well done, than a great deal imperfectly.",
    theme: "focus"
  },
  {
    id: 9,
    authorId: 7,
    text: "Concentrate every minute on doing what's in front of you with precise and genuine seriousness.",
    theme: "focus"
  },
  // Growth quotes
  {
    id: 10,
    authorId: 1,
    text: "Impossible is a word to be found only in the dictionary of fools.",
    theme: "growth"
  },
  {
    id: 11,
    authorId: 2,
    text: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.",
    theme: "growth"
  },
  {
    id: 12,
    authorId: 6,
    text: "Do what you can, with what you have, where you are.",
    theme: "growth"
  },
  {
    id: 13,
    authorId: 7,
    text: "The happiness of your life depends upon the quality of your thoughts.",
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