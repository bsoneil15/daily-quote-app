import type { Author, Quote } from "./schema";

export const authors: Author[] = [
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
  },
  {
    id: 8,
    name: "Aristotle",
    imageUrl: "",
    bio: "Ancient Greek philosopher"
  },
  {
    id: 9,
    name: "Lao Tzu",
    imageUrl: "",
    bio: "Ancient Chinese philosopher"
  },
  {
    id: 10,
    name: "Sun Tzu",
    imageUrl: "",
    bio: "Ancient Chinese military strategist"
  },
  {
    id: 11,
    name: "Abraham Lincoln",
    imageUrl: "",
    bio: "16th President of the United States"
  },
  {
    id: 12,
    name: "Winston Churchill",
    imageUrl: "",
    bio: "British Prime Minister and statesman"
  },
  {
    id: 13,
    name: "Dwight D. Eisenhower",
    imageUrl: "",
    bio: "American general and 34th President of the United States"
  },
  {
    id: 14,
    name: "George S. Patton",
    imageUrl: "",
    bio: "American general"
  },
  {
    id: 15,
    name: "John F. Kennedy",
    imageUrl: "",
    bio: "35th President of the United States"
  },
  {
    id: 16,
    name: "Pericles",
    imageUrl: "",
    bio: "Athenian statesman and general"
  },
  {
    id: 17,
    name: "Cicero",
    imageUrl: "",
    bio: "Roman statesman and philosopher"
  },
  {
    id: 18,
    name: "Benjamin Franklin",
    imageUrl: "",
    bio: "American polymath and Founding Father"
  },
  {
    id: 19,
    name: "Heraclitus",
    imageUrl: "",
    bio: "Ancient Greek philosopher"
  },
  {
    id: 20,
    name: "Epictetus",
    imageUrl: "",
    bio: "Greek Stoic philosopher"
  },
  {
    id: 21,
    name: "Socrates",
    imageUrl: "",
    bio: "Classical Greek philosopher"
  },
  {
    id: 22,
    name: "Confucius",
    imageUrl: "",
    bio: "Ancient Chinese philosopher"
  },
  {
    id: 23,
    name: "Albert Einstein",
    imageUrl: "",
    bio: "German-born theoretical physicist"
  },
  {
    id: 24,
    name: "Thomas Edison",
    imageUrl: "",
    bio: "American inventor"
  },
  {
    id: 25,
    name: "Ralph Waldo Emerson",
    imageUrl: "",
    bio: "American essayist and philosopher"
  },
  {
    id: 26,
    name: "Henry Ford",
    imageUrl: "",
    bio: "American industrialist"
  },
  {
    id: 27,
    name: "Aesop",
    imageUrl: "",
    bio: "Ancient Greek storyteller"
  },
  {
    id: 28,
    name: "Pythagoras",
    imageUrl: "",
    bio: "Ancient Greek philosopher and mathematician"
  }
];

export const quotes: Quote[] = [
  // Leadership quotes
  { id: 1, authorId: 1, text: "A leader is a dealer in hope.", theme: "leadership" },
  { id: 2, authorId: 1, text: "The battlefield is a scene of constant chaos. The winner will be the one who controls that chaos, both his own and the enemy's.", theme: "leadership" },
  { id: 3, authorId: 2, text: "A great leader never sets out to be a leader. He sets out to make a difference.", theme: "leadership" },
  { id: 4, authorId: 3, text: "The measure of a man is what he does with power.", theme: "leadership" },
  { id: 5, authorId: 3, text: "Wise men speak because they have something to say; fools because they have to say something.", theme: "leadership" },
  { id: 6, authorId: 5, text: "Optimism is true moral courage.", theme: "leadership" },
  { id: 7, authorId: 6, text: "The best executive is one who has sense enough to pick good men to do what he wants done, and self-restraint to keep from meddling while they do it.", theme: "leadership" },
  { id: 20, authorId: 8, text: "He who cannot be a good follower cannot be a good leader.", theme: "leadership" },
  { id: 21, authorId: 9, text: "A leader is best when people barely know he exists.", theme: "leadership" },
  { id: 22, authorId: 10, text: "Victorious warriors win first and then go to war.", theme: "leadership" },
  { id: 23, authorId: 11, text: "Nearly all men can stand adversity, but if you want to test a man's character, give him power.", theme: "leadership" },
  { id: 24, authorId: 12, text: "Courage is rightly esteemed the first of human qualities because it is the quality which guarantees all others.", theme: "leadership" },
  { id: 25, authorId: 13, text: "You do not lead by hitting people over the head. That is assault, not leadership.", theme: "leadership" },
  { id: 26, authorId: 14, text: "Lead me, follow me, or get out of my way.", theme: "leadership" },
  { id: 27, authorId: 15, text: "Leadership and learning are indispensable to each other.", theme: "leadership" },
  { id: 28, authorId: 16, text: "What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.", theme: "leadership" },
  { id: 29, authorId: 17, text: "The welfare of the people is the supreme law.", theme: "leadership" },
  { id: 30, authorId: 3, text: "The heaviest penalty for declining to rule is to be ruled by someone inferior to yourself.", theme: "leadership" },
  { id: 31, authorId: 1, text: "A soldier will fight long and hard for a bit of colored ribbon.", theme: "leadership" },
  { id: 32, authorId: 5, text: "Through endurance we conquer.", theme: "leadership" },
  { id: 33, authorId: 6, text: "Far better it is to dare mighty things than to rank with those poor spirits who neither enjoy much nor suffer much.", theme: "leadership" },
  { id: 34, authorId: 18, text: "Well done is better than well said.", theme: "leadership" },
  { id: 35, authorId: 19, text: "Character is destiny.", theme: "leadership" },
  { id: 36, authorId: 20, text: "No man is free who is not master of himself.", theme: "leadership" },
  { id: 37, authorId: 21, text: "The only true wisdom is in knowing you know nothing.", theme: "leadership" },

  // Focus quotes
  { id: 8, authorId: 1, text: "Take time to deliberate, but when the time for action comes, stop thinking and go in.", theme: "focus" },
  { id: 9, authorId: 2, text: "He who is everywhere is nowhere.", theme: "focus" },
  { id: 10, authorId: 3, text: "Better a little which is well done, than a great deal imperfectly.", theme: "focus" },
  { id: 11, authorId: 4, text: "One never notices what has been done; one can only see what remains to be done.", theme: "focus" },
  { id: 12, authorId: 7, text: "Concentrate every minute on doing what's in front of you with precise and genuine seriousness.", theme: "focus" },
  { id: 13, authorId: 7, text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.", theme: "focus" },
  { id: 38, authorId: 8, text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", theme: "focus" },
  { id: 39, authorId: 7, text: "Do every act of your life as though it were the very last act.", theme: "focus" },
  { id: 40, authorId: 2, text: "It is not that we have a short time to live, but that we waste a lot of it.", theme: "focus" },
  { id: 41, authorId: 18, text: "Lost time is never found again.", theme: "focus" },
  { id: 42, authorId: 18, text: "Dost thou love life? Then do not squander time, for that is the stuff life is made of.", theme: "focus" },
  { id: 43, authorId: 9, text: "He who knows others is wise. He who knows himself is enlightened.", theme: "focus" },
  { id: 44, authorId: 22, text: "The man who moves a mountain begins by carrying away small stones.", theme: "focus" },
  { id: 45, authorId: 10, text: "He will win who knows when to fight and when not to fight.", theme: "focus" },
  { id: 46, authorId: 3, text: "The beginning is the most important part of the work.", theme: "focus" },
  { id: 47, authorId: 4, text: "Be less curious about people and more curious about ideas.", theme: "focus" },
  { id: 48, authorId: 23, text: "It's not that I'm so smart, it's just that I stay with problems longer.", theme: "focus" },
  { id: 49, authorId: 24, text: "Opportunity is missed by most people because it is dressed in overalls and looks like work.", theme: "focus" },
  { id: 50, authorId: 25, text: "Finish each day and be done with it.", theme: "focus" },
  { id: 51, authorId: 20, text: "First say to yourself what you would be; and then do what you have to do.", theme: "focus" },
  { id: 52, authorId: 7, text: "The impediment to action advances action. What stands in the way becomes the way.", theme: "focus" },
  { id: 53, authorId: 19, text: "You cannot step twice into the same river.", theme: "focus" },
  { id: 54, authorId: 28, text: "No man is free who cannot control himself.", theme: "focus" },
  { id: 55, authorId: 1, text: "The reason I beat the Austrians is that they did not know the value of five minutes.", theme: "focus" },
  { id: 56, authorId: 5, text: "Difficulties are just things to overcome, after all.", theme: "focus" },

  // Growth quotes
  { id: 14, authorId: 1, text: "Impossible is a word to be found only in the dictionary of fools.", theme: "growth" },
  { id: 15, authorId: 2, text: "It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.", theme: "growth" },
  { id: 16, authorId: 4, text: "Life is not easy for any of us. But what of that? We must have perseverance and above all confidence in ourselves.", theme: "growth" },
  { id: 17, authorId: 6, text: "Do what you can, with what you have, where you are.", theme: "growth" },
  { id: 18, authorId: 7, text: "The happiness of your life depends upon the quality of your thoughts.", theme: "growth" },
  { id: 19, authorId: 7, text: "Waste no more time arguing about what a good man should be. Be one.", theme: "growth" },
  { id: 57, authorId: 8, text: "Our characters are the result of our conduct.", theme: "growth" },
  { id: 58, authorId: 20, text: "It's not what happens to you, but how you react to it that matters.", theme: "growth" },
  { id: 59, authorId: 20, text: "No great thing is created suddenly.", theme: "growth" },
  { id: 60, authorId: 24, text: "Genius is 1% inspiration and 99% perspiration.", theme: "growth" },
  { id: 61, authorId: 26, text: "Whether you think you can, or you think you can't – you're right.", theme: "growth" },
  { id: 62, authorId: 25, text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", theme: "growth" },
  { id: 63, authorId: 25, text: "Do the thing and you will have the power.", theme: "growth" },
  { id: 64, authorId: 18, text: "An investment in knowledge pays the best interest.", theme: "growth" },
  { id: 65, authorId: 23, text: "Imagination is more important than knowledge.", theme: "growth" },
  { id: 66, authorId: 23, text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", theme: "growth" },
  { id: 67, authorId: 12, text: "If you are going through hell, keep going.", theme: "growth" },
  { id: 68, authorId: 27, text: "Slow and steady wins the race.", theme: "growth" },
  { id: 69, authorId: 9, text: "A journey of a thousand miles begins with a single step.", theme: "growth" },
  { id: 70, authorId: 22, text: "It does not matter how slowly you go as long as you do not stop.", theme: "growth" },
  { id: 71, authorId: 7, text: "When you arise in the morning, think of what a precious privilege it is to be alive, to breathe, to think, to enjoy, to love.", theme: "growth" },
  { id: 72, authorId: 4, text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.", theme: "growth" },
  { id: 73, authorId: 1, text: "Victory belongs to the most persevering.", theme: "growth" },
  { id: 74, authorId: 2, text: "True happiness is to enjoy the present, without anxious dependence upon the future.", theme: "growth" },
  { id: 75, authorId: 21, text: "The unexamined life is not worth living.", theme: "growth" }
];

export const themeBackgrounds = {
  leadership: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  focus: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5",
  growth: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
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
