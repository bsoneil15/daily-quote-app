
import { db } from './db';
import { authors, quotes } from '@shared/schema';
import { quotes as existingQuotes, authors as existingAuthors } from '@shared/data';
import { sql } from 'drizzle-orm';

// Maps author names to their IDs
const authorNameToId: Record<string, number> = {};

// Populate the authorNameToId map with existing authors
existingAuthors.forEach(author => {
  authorNameToId[author.name] = author.id;
});

// Function to add a new author if they don't exist
async function ensureAuthor(name: string): Promise<number> {
  // If we already have this author, return their ID
  if (authorNameToId[name]) {
    return authorNameToId[name];
  }

  // Get the next available ID (max ID + 1)
  const result = await db.select({ maxId: sql<number>`COALESCE(MAX(id), 0)` }).from(authors);
  const nextId = result[0].maxId + 1;

  // Default values for new authors
  const newAuthor = {
    id: nextId,
    name,
    imageUrl: "https://via.placeholder.com/150", // Default image
    bio: `Author and philosopher` // Default bio
  };

  // Insert the new author
  await db.insert(authors).values(newAuthor);
  
  // Update our map
  authorNameToId[name] = nextId;
  
  console.log(`Added new author: ${name} with ID ${nextId}`);
  
  return nextId;
}

// Main function to add quotes
async function seedQuotes() {
  try {
    // First, get the current max quote ID
    const result = await db.select({ maxId: sql<number>`COALESCE(MAX(id), 0)` }).from(quotes);
    let nextQuoteId = result[0].maxId + 1;

    // Sample data (this would be replaced with data from the file)
    const quotesData = [
      { name: "Seneca", quote: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.", theme: "Leadership" },
      { name: "Aristotle", quote: "The roots of education are bitter, but the fruit is sweet.", theme: "Growth" },
      // ... more quotes here
    ];

    // Process each line from the file
    const quoteLines = `Name,Quote,Theme
Seneca,"The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.",Leadership
Aristotle,"The roots of education are bitter, but the fruit is sweet.",Growth
Marcus Aurelius,"The best revenge is to be unlike him who performed the injury.",Leadership
Winston Churchill,"Success is not final, failure is not fatal: It is the courage to continue that counts.",Growth
Teddy Roosevelt,"Do what you can, with what you have, where you are.",Focus
Marie Curie,"Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",Growth
Franklin D. Roosevelt,"The only limit to our realization of tomorrow is our doubts of today.",Growth
Eleanor Roosevelt,"The future belongs to those who believe in the beauty of their dreams.",Leadership
Mark Twain,"The secret of getting ahead is getting started.",Focus
Benjamin Franklin,"An investment in knowledge pays the best interest.",Growth
Nelson Mandela,"It always seems impossible until it's done.",Growth
Maya Angelou,"You may not control all the events that happen to you, but you can decide not to be reduced by them.",Focus
Albert Einstein,"Life is like riding a bicycle. To keep your balance, you must keep moving.",Focus
Abraham Lincoln,"The best way to predict your future is to create it.",Leadership
Confucius,"It does not matter how slowly you go as long as you do not stop.",Growth
Thomas Jefferson,"I find that the harder I work, the more luck I seem to have.",Focus
Viktor Frankl,"When we are no longer able to change a situation, we are challenged to change ourselves.",Growth
John F. Kennedy,"Leadership and learning are indispensable to each other.",Leadership
Rosa Parks,"I have learned over the years that when one's mind is made up, this diminishes fear.",Focus
Leonardo da Vinci,"Learning never exhausts the mind.",Growth
Margaret Thatcher,"You may have to fight a battle more than once to win it.",Leadership
Ralph Waldo Emerson,"Do not go where the path may lead, go instead where there is no path and leave a trail.",Leadership
Plato,"Courage is knowing what not to fear.",Focus
Epictetus,"Wealth consists not in having great possessions, but in having few wants.",Focus
Niccolò Machiavelli,"It is better to be feared than loved, if you cannot be both.",Leadership
Seneca,"Luck is what happens when preparation meets opportunity.",Focus
Aristotle,"We are what we repeatedly do. Excellence, then, is not an act, but a habit.",Growth
Marcus Aurelius,"You have power over your mind—not outside events. Realize this, and you will find strength.",Focus
Winston Churchill,"The price of greatness is responsibility.",Leadership
Teddy Roosevelt,"Keep your eyes on the stars, and your feet on the ground.",Focus
Marie Curie,"Be less curious about people and more curious about ideas.",Growth
Franklin D. Roosevelt,"Happiness lies in the joy of achievement and the thrill of creative effort.",Growth
Eleanor Roosevelt,"Great minds discuss ideas; average minds discuss events; small minds discuss people.",Leadership
Mark Twain,"Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",Growth
Benjamin Franklin,"Well done is better than well said.",Focus
Nelson Mandela,"The greatest glory in living lies not in never falling, but in rising every time we fall.",Growth
Maya Angelou,"If you don't like something, change it. If you can't change it, change your attitude.",Focus
Albert Einstein,"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",Growth
Abraham Lincoln,"I am not bound to win, but I am bound to be true. I am not bound to succeed, but I am bound to live up to what light I have.",Leadership
Confucius,"The man who moves a mountain begins by carrying away small stones.",Focus
Thomas Jefferson,"Determine never to be idle. No person will have occasion to complain of the want of time who never loses any.",Focus
Viktor Frankl,"Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances.",Growth
John F. Kennedy,"Efforts and courage are not enough without purpose and direction.",Leadership
Rosa Parks,"Each person must live their life as a model for others.",Leadership
Leonardo da Vinci,"Simplicity is the ultimate sophistication.",Focus
Margaret Thatcher,"Disciplining yourself to do what you know is right and important, although difficult, is the highroad to pride, self-esteem, and personal satisfaction.",Focus
Ralph Waldo Emerson,"What lies behind us and what lies before us are tiny matters compared to what lies within us.",Growth
Plato,"The first and greatest victory is to conquer yourself.",Growth
Epictetus,"It's not what happens to you, but how you react to it that matters.",Focus
Niccolò Machiavelli,"The wise man does at once what the fool does finally.",Leadership
Seneca,"It is not the man who has too little, but the man who craves more, that is poor.",Focus
Aristotle,"Pleasure in the job puts perfection in the work.",Growth
Marcus Aurelius,"The happiness of your life depends upon the quality of your thoughts.",Focus
Winston Churchill,"To improve is to change; to be perfect is to change often.",Growth
Teddy Roosevelt,"Believe you can and you're halfway there.",Leadership
Marie Curie,"I was taught that the way of progress is neither swift nor easy.",Growth
Franklin D. Roosevelt,"The only thing we have to fear is fear itself.",Leadership
Eleanor Roosevelt,"Do one thing every day that scares you.",Growth
Mark Twain,"Courage is resistance to fear, mastery of fear—not absence of fear.",Focus
Benjamin Franklin,"Energy and persistence conquer all things.",Growth
Nelson Mandela,"A winner is a dreamer who never gives up.",Leadership
Maya Angelou,"We may encounter many defeats but we must not be defeated.",Growth
Albert Einstein,"Try not to become a man of success, but rather try to become a man of value.",Leadership
Abraham Lincoln,"My great concern is not whether you have failed, but whether you are content with your failure.",Growth
Confucius,"Our greatest glory is not in never falling, but in rising every time we fall.",Growth
Thomas Jefferson,"I find that the harder I work, the more luck I seem to have.",Focus
Viktor Frankl,"The meaning of life is to give life meaning.",Growth
John F. Kennedy,"Change is the law of life. And those who look only to the past or present are certain to miss the future.",Growth
Rosa Parks,"I would like to be remembered as a person who wanted to be free... so other people would be also free.",Leadership
Leonardo da Vinci,"As a well-spent day brings happy sleep, so a life well spent brings happy death.",Growth
Margaret Thatcher,"You may have to fight a battle more than once to win it.",Leadership
Ralph Waldo Emerson,"The only person you are destined to become is the person you decide to be.",Growth
Plato,"Wise men speak because they have something to say; fools because they have to say something.",Focus
Epictetus,"First say to yourself what you would be; and then do what you have to do.",Leadership
Niccolò Machiavelli,"It is not titles that honor men, but men that honor titles.",Leadership
Seneca,"While we are postponing, life speeds by.",Focus
Aristotle,"The more you know, the more you realize you don't know.",Growth
Marcus Aurelius,"Waste no more time arguing about what a good man should be. Be one.",Leadership
Winston Churchill,"Attitude is a little thing that makes a big difference.",Focus
Teddy Roosevelt,"The only man who never makes mistakes is the man who never does anything.",Growth
Marie Curie,"Life is not easy for any of us. But what of that? We must have perseverance.",Growth
Franklin D. Roosevelt,"Men are not prisoners of fate, but only prisoners of their own minds.",Focus
Eleanor Roosevelt,"You must do the thing you think you cannot do.",Growth
Mark Twain,"The two most important days in your life are the day you are born and the day you find out why.",Growth
Benjamin Franklin,"Without continual growth and progress, such words as improvement, achievement, and success have no meaning.",Growth
Nelson Mandela,"Education is the most powerful weapon which you can use to change the world.",Leadership
Maya Angelou,"I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",Leadership
Albert Einstein,"It's not that I'm so smart, it's just that I stay with problems longer.",Focus`.split('\n');

    // Skip the header line
    const quotesToAdd = [];
    
    for (let i = 1; i < quoteLines.length; i++) {
      const line = quoteLines[i].trim();
      if (!line) continue;
      
      // Parse CSV line - handling quoted fields with commas
      let parts: string[] = [];
      let currentPart = '';
      let insideQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          parts.push(currentPart);
          currentPart = '';
        } else {
          currentPart += char;
        }
      }
      
      // Add the last part
      parts.push(currentPart);
      
      if (parts.length >= 3) {
        const authorName = parts[0].trim();
        const quoteText = parts[1].trim().replace(/^"(.*)"$/, '$1'); // Remove surrounding quotes if present
        const theme = parts[2].trim().toLowerCase();
        
        // Validate theme
        const validTheme = ["leadership", "focus", "growth"].includes(theme) 
          ? theme 
          : (theme === "Leadership" ? "leadership" : 
             theme === "Focus" ? "focus" : 
             theme === "Growth" ? "growth" : "leadership");
        
        // Store for processing
        quotesToAdd.push({
          authorName,
          quoteText,
          theme: validTheme as "leadership" | "focus" | "growth"
        });
      }
    }

    console.log(`Found ${quotesToAdd.length} quotes to add`);

    // Add all quotes
    let addedCount = 0;
    for (const quoteData of quotesToAdd) {
      // Ensure the author exists
      const authorId = await ensureAuthor(quoteData.authorName);
      
      // Check if this quote already exists
      const existing = await db.select()
        .from(quotes)
        .where(sql`text = ${quoteData.quoteText} AND author_id = ${authorId}`);
      
      if (existing.length === 0) {
        // Add the quote
        await db.insert(quotes).values({
          id: nextQuoteId++,
          authorId,
          text: quoteData.quoteText,
          theme: quoteData.theme
        });
        
        addedCount++;
      }
    }

    // Count total quotes in the database
    const countResult = await db.select({ count: sql<number>`COUNT(*)` }).from(quotes);
    const totalQuotes = countResult[0].count;

    console.log(`Added ${addedCount} new quotes. Total quotes in database: ${totalQuotes}`);
    return { added: addedCount, total: totalQuotes };
  } catch (error) {
    console.error('Error seeding quotes:', error);
    throw error;
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  seedQuotes()
    .then(result => {
      console.log(`Seed complete. Added ${result.added} quotes. Total quotes: ${result.total}`);
      process.exit(0);
    })
    .catch(error => {
      console.error('Seed failed:', error);
      process.exit(1);
    });
}

export { seedQuotes };
