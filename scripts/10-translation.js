/**
 * 10 - Translation
 * 
 * This script demonstrates how to translate text between
 * different languages using AI.
 * 
 * Use cases:
 * - Multi-language applications
 * - Content localization
 * - Language learning
 * - International communication
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function translation() {
  try {
    console.log('🌍 Translation example...\n');

    const textToTranslate = 'Hello, how are you today? I hope you are having a wonderful day!';
    const targetLanguage = 'Spanish';

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Provide accurate, natural translations.'
        },
        {
          role: 'user',
          content: `Translate the following text to ${targetLanguage}:\n\n"${textToTranslate}"`
        }
      ],
      temperature: 0.3,
    });

    console.log('📝 Original (English):');
    console.log(textToTranslate);
    console.log(`\n🌍 Translation (${targetLanguage}):`);
    console.log(response.choices[0].message.content);
    console.log('\n💡 Try changing the target language!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

translation();

