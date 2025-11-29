/**
 * 12 - Question Answering
 * 
 * This script demonstrates how to build a Q&A system
 * that answers questions based on provided context.
 * 
 * Use cases:
 * - FAQ systems
 * - Document Q&A
 * - Knowledge bases
 * - Customer support
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function questionAnswering() {
  try {
    console.log('❓ Question answering with context...\n');

    const context = `
      JavaScript is a high-level, interpreted programming language that conforms to the 
      ECMAScript specification. It is characterized as dynamic, weakly typed, prototype-based 
      and multi-paradigm. JavaScript was created in 1995 by Brendan Eich at Netscape. 
      It is primarily used for web development, both on the client-side and server-side 
      (Node.js). Modern JavaScript includes features like arrow functions, async/await, 
      classes, and modules.
    `;

    const questions = [
      'Who created JavaScript?',
      'What year was JavaScript created?',
      'What are some modern JavaScript features?'
    ];

    for (const question of questions) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that answers questions based on the provided context. If the answer is not in the context, say so.'
          },
          {
            role: 'user',
            content: `Context: ${context}\n\nQuestion: ${question}`
          }
        ],
        temperature: 0.3,
      });

      console.log('❓ Question:', question);
      console.log('💡 Answer:', response.choices[0].message.content);
      console.log('---\n');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

questionAnswering();

