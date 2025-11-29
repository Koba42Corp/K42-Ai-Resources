/**
 * 08 - Code Generation
 * 
 * This script demonstrates how to use AI to generate code
 * in various programming languages.
 * 
 * Use cases:
 * - Code snippets
 * - Function implementations
 * - Algorithm explanations
 * - Code refactoring
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function codeGeneration() {
  try {
    console.log('💻 Generating code with AI...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert programmer. Generate clean, well-commented code.'
        },
        {
          role: 'user',
          content: 'Write a JavaScript function that takes an array of numbers and returns the sum of all even numbers. Include comments explaining the logic.'
        }
      ],
      temperature: 0.3, // Lower temperature for more deterministic code
    });

    console.log('📝 Generated Code:\n');
    console.log(response.choices[0].message.content);
    console.log('\n💡 You can copy this code and use it in your projects!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

codeGeneration();

