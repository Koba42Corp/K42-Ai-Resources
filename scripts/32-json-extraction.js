/**
 * 32 - JSON Data Extraction
 * 
 * This script demonstrates extracting structured data from
 * unstructured text and converting it to JSON.
 * 
 * Use cases:
 * - Data parsing
 * - Form extraction
 * - API response formatting
 * - Data transformation
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function jsonExtraction() {
  try {
    console.log('📦 JSON data extraction example...\n');

    const unstructuredText = `
      Product: Laptop Pro 15
      Price: $1,299.99
      Brand: TechCorp
      Specifications: 16GB RAM, 512GB SSD, Intel i7 processor
      In Stock: Yes
      Rating: 4.5 out of 5 stars
      Reviews: 234
    `;

    console.log('📝 Unstructured text:');
    console.log(unstructuredText);
    console.log('\n⏳ Extracting to JSON...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Extract information and return as valid JSON. Use appropriate data types (numbers, booleans, strings).'
        },
        {
          role: 'user',
          content: `Extract product information from this text into JSON format:\n\n${unstructuredText}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const extractedData = JSON.parse(response.choices[0].message.content);
    
    console.log('✅ Extracted JSON:');
    console.log(JSON.stringify(extractedData, null, 2));
    console.log('\n💡 This structured data is ready for database storage or API responses!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

jsonExtraction();

