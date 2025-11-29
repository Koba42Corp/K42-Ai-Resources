/**
 * 35 - Prompt Chaining
 * 
 * This script demonstrates chaining multiple AI calls
 * where the output of one becomes input to the next.
 * 
 * Use cases:
 * - Multi-step processing
 * - Complex workflows
 * - Iterative refinement
 * - Pipeline operations
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function promptChaining() {
  try {
    console.log('🔗 Prompt chaining example...\n');

    const topic = 'machine learning';

    // Step 1: Generate an outline
    console.log('Step 1: Generating outline...');
    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Create a detailed outline for an article about ${topic}. Include 5 main sections with 3 sub-points each.`
        }
      ],
    });
    const outline = response.choices[0].message.content;
    console.log('✅ Outline generated\n');

    // Step 2: Expand first section
    console.log('Step 2: Expanding first section...');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Based on this outline, write the first section in detail:\n\n${outline}`
        }
      ],
    });
    const firstSection = response.choices[0].message.content;
    console.log('✅ First section written\n');

    // Step 3: Create summary
    console.log('Step 3: Creating summary...');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Create a brief summary of this content:\n\nOutline:\n${outline}\n\nFirst Section:\n${firstSection}`
        }
      ],
      max_tokens: 100,
    });
    const summary = response.choices[0].message.content;
    console.log('✅ Summary created\n');

    console.log('📊 Final Results:');
    console.log('\n📋 Outline:');
    console.log(outline.substring(0, 200) + '...');
    console.log('\n📝 First Section:');
    console.log(firstSection.substring(0, 200) + '...');
    console.log('\n📄 Summary:');
    console.log(summary);
    console.log('\n💡 Chain multiple prompts for complex workflows!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

promptChaining();

