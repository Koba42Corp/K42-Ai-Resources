/**
 * 45 - Prompt Optimization
 * 
 * This script demonstrates techniques for optimizing
 * prompts to get better results and reduce costs.
 * 
 * Use cases:
 * - Cost reduction
 * - Better accuracy
 * - Faster responses
 * - Improved quality
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function promptOptimization() {
  try {
    console.log('⚡ Prompt optimization example...\n');

    const topic = 'async/await in JavaScript';

    // Unoptimized prompt
    console.log('1️⃣ Unoptimized prompt (verbose):\n');
    const unoptimizedPrompt = `
      I would like you to please explain to me in great detail about the concept of 
      async/await in JavaScript programming language. Can you tell me what it is, 
      how it works, why it's useful, and provide some examples? I really want to 
      understand this thoroughly so please be comprehensive.
    `;

    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: unoptimizedPrompt }],
    });

    console.log(`Tokens used: ${response.usage.total_tokens}`);
    console.log(`Response length: ${response.choices[0].message.content.length} chars\n`);

    // Optimized prompt
    console.log('2️⃣ Optimized prompt (concise):\n');
    const optimizedPrompt = `Explain ${topic} with 2 examples.`;

    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: optimizedPrompt }],
      max_tokens: 200, // Limit response length
    });

    console.log(`Tokens used: ${response.usage.total_tokens}`);
    console.log(`Response length: ${response.choices[0].message.content.length} chars\n`);

    // Using system prompt for context
    console.log('3️⃣ Using system prompt (better structure):\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a JavaScript expert. Give concise, practical explanations.'
        },
        {
          role: 'user',
          content: `Explain ${topic}`
        }
      ],
      max_tokens: 150,
      temperature: 0.3, // Lower for more focused responses
    });

    console.log(`Tokens used: ${response.usage.total_tokens}`);
    console.log(`Response: ${response.choices[0].message.content.substring(0, 100)}...\n`);

    console.log('💡 Optimization tips:');
    console.log('  - Be concise and specific');
    console.log('  - Use system prompts for context');
    console.log('  - Set max_tokens to limit length');
    console.log('  - Use appropriate temperature');
    console.log('  - Remove unnecessary words');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

promptOptimization();

