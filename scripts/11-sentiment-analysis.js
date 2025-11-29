/**
 * 11 - Sentiment Analysis
 * 
 * This script demonstrates how to analyze the sentiment
 * (positive, negative, neutral) of text using AI.
 * 
 * Use cases:
 * - Social media monitoring
 * - Customer feedback analysis
 * - Review processing
 * - Brand reputation tracking
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function sentimentAnalysis() {
  try {
    console.log('😊 Sentiment analysis example...\n');

    const texts = [
      'I absolutely love this product! It exceeded all my expectations.',
      'The service was okay, nothing special.',
      'This is the worst experience I have ever had. Completely disappointed.'
    ];

    for (const text of texts) {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a sentiment analysis expert. Analyze the sentiment and respond with: POSITIVE, NEGATIVE, or NEUTRAL, followed by a brief explanation.'
          },
          {
            role: 'user',
            content: `Analyze the sentiment of this text: "${text}"`
          }
        ],
        temperature: 0.3,
      });

      console.log('📝 Text:', text);
      console.log('📊 Analysis:', response.choices[0].message.content);
      console.log('---\n');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

sentimentAnalysis();

