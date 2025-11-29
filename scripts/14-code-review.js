/**
 * 14 - Code Review
 * 
 * This script demonstrates how to use AI to review code,
 * suggest improvements, and identify potential issues.
 * 
 * Use cases:
 * - Automated code reviews
 * - Learning best practices
 * - Bug detection
 * - Code quality improvement
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function codeReview() {
  try {
    console.log('🔍 Code review example...\n');

    const codeToReview = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code reviewer. Analyze code for bugs, performance issues, best practices, and suggest improvements. Be constructive and educational.'
        },
        {
          role: 'user',
          content: `Review this JavaScript code and provide feedback:\n\n\`\`\`javascript\n${codeToReview}\n\`\`\``
        }
      ],
      temperature: 0.3,
    });

    console.log('📝 Code to review:');
    console.log(codeToReview);
    console.log('\n📊 Code Review:');
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

codeReview();

