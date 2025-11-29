/**
 * 33 - Text Classification
 * 
 * This script demonstrates how to classify text into
 * categories using AI.
 * 
 * Use cases:
 * - Email categorization
 * - Content moderation
 * - Topic tagging
 * - Spam detection
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function textClassification() {
  try {
    console.log('🏷️  Text classification example...\n');

    const texts = [
      'How do I reset my password?',
      'I want to cancel my subscription immediately!',
      'Can you tell me about your pricing plans?',
      'The app crashed when I tried to upload a file.',
      'Thank you for the great service!'
    ];

    const categories = ['Support', 'Billing', 'Sales', 'Bug Report', 'Feedback'];

    console.log('📝 Texts to classify:', texts.length);
    console.log('🏷️  Categories:', categories.join(', '));
    console.log('\n⏳ Classifying...\n');

    for (const text of texts) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Classify the text into one of these categories: ${categories.join(', ')}. Respond with only the category name.`
          },
          {
            role: 'user',
            content: `Classify this text: "${text}"`
          }
        ],
        temperature: 0.3,
        max_tokens: 20,
      });

      const classification = response.choices[0].message.content.trim();
      console.log(`📝 Text: "${text}"`);
      console.log(`🏷️  Category: ${classification}\n`);
    }

    console.log('✅ Classification complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

textClassification();

