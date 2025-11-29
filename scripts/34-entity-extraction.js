/**
 * 34 - Named Entity Recognition (NER)
 * 
 * This script demonstrates extracting named entities
 * (people, places, organizations) from text.
 * 
 * Use cases:
 * - Information extraction
 * - Knowledge graphs
 * - Data mining
 * - Content analysis
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function entityExtraction() {
  try {
    console.log('🔍 Named Entity Recognition example...\n');

    const text = `
      Apple Inc., founded by Steve Jobs in Cupertino, California, announced a new iPhone 
      at their event in San Francisco. The CEO Tim Cook presented the device to journalists 
      from The New York Times and TechCrunch. The launch date is set for September 15, 2024.
    `;

    console.log('📝 Text:', text);
    console.log('\n⏳ Extracting entities...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Extract named entities from the text. Return as JSON with categories: persons, organizations, locations, dates, products.'
        },
        {
          role: 'user',
          content: `Extract all named entities from this text:\n\n${text}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const entities = JSON.parse(response.choices[0].message.content);
    
    console.log('✅ Extracted Entities:');
    console.log(JSON.stringify(entities, null, 2));
    console.log('\n💡 Use these entities for knowledge graphs, databases, or search!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

entityExtraction();

