/**
 * 04 - System Prompts
 * 
 * This script demonstrates how to use system prompts to
 * define the AI's behavior, personality, and role.
 * 
 * Use cases:
 * - Role-playing assistants
 * - Specialized experts
 * - Consistent behavior
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function systemPrompt() {
  try {
    console.log('🎭 Using system prompts to define AI behavior...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a friendly and encouraging coding mentor. You explain concepts clearly, use simple language, and always include practical examples.'
        },
        {
          role: 'user',
          content: 'What is a closure in JavaScript?'
        }
      ],
    });

    console.log('📋 System Prompt: Friendly coding mentor\n');
    console.log('👤 User: What is a closure in JavaScript?\n');
    console.log('🤖 AI Response:');
    console.log(response.choices[0].message.content);
    console.log('\n💡 Try changing the system prompt to see different behaviors!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

systemPrompt();

