/**
 * 46 - Documentation Generator
 * 
 * This script demonstrates using AI to generate code
 * documentation automatically.
 * 
 * Use cases:
 * - Auto-documentation
 * - API docs
 * - Code comments
 * - README generation
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function documentationGenerator() {
  try {
    console.log('📚 Documentation generator example...\n');

    const code = `
function calculateTotal(items, taxRate = 0.1) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}
    `;

    console.log('📝 Code to document:');
    console.log(code);
    console.log('\n⏳ Generating documentation...\n');

    // Generate JSDoc comments
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a documentation expert. Generate clear, comprehensive JSDoc comments for code.'
        },
        {
          role: 'user',
          content: `Generate JSDoc documentation for this JavaScript function:\n\n${code}`
        }
      ],
      temperature: 0.3,
    });

    console.log('✅ Generated Documentation:');
    console.log(response.choices[0].message.content);
    console.log('\n💡 Use AI to automatically document your code!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

documentationGenerator();

