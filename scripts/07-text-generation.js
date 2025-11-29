/**
 * 07 - Text Generation
 * 
 * This script demonstrates various text generation techniques
 * with different parameters to control output.
 * 
 * Learn about:
 * - Temperature (creativity)
 * - Max tokens (length)
 * - Top-p (nucleus sampling)
 * - Frequency/presence penalties
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function textGeneration() {
  try {
    console.log('✍️ Text generation with different parameters...\n');

    const prompt = 'Write a haiku about programming';

    // Low temperature - more focused and deterministic
    console.log('📝 Low temperature (0.2) - More focused:\n');
    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 50,
    });
    console.log(response.choices[0].message.content);
    console.log('\n---\n');

    // High temperature - more creative and varied
    console.log('📝 High temperature (1.5) - More creative:\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.5,
      max_tokens: 50,
    });
    console.log(response.choices[0].message.content);
    console.log('\n---\n');

    // With frequency penalty - reduces repetition
    console.log('📝 With frequency penalty - Less repetitive:\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'List 10 programming languages' }],
      temperature: 0.7,
      frequency_penalty: 0.5, // Reduces repetition
      max_tokens: 100,
    });
    console.log(response.choices[0].message.content);
    console.log('\n💡 Experiment with these parameters to get desired outputs!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

textGeneration();

