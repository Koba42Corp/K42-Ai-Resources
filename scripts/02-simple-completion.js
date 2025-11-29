/**
 * 02 - Simple Text Completion
 * 
 * This script demonstrates the most basic AI interaction:
 * sending a prompt and receiving a text response.
 * 
 * Use cases:
 * - Quick questions
 * - Simple text generation
 * - Getting AI assistance
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function simpleCompletion() {
  try {
    console.log('💬 Making a simple completion request...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Explain what artificial intelligence is in one paragraph.'
        }
      ],
      max_tokens: 150,
      temperature: 0.7, // Controls randomness (0-2, default 1)
    });

    console.log('📤 Your question: Explain what artificial intelligence is\n');
    console.log('🤖 AI Response:');
    console.log(response.choices[0].message.content);
    console.log('\n📊 Token usage:', response.usage);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

simpleCompletion();

