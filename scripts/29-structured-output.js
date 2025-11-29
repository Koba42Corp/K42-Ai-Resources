/**
 * 29 - Structured Output
 * 
 * This script demonstrates how to get structured JSON output
 * from AI responses for easier programmatic use.
 * 
 * Use cases:
 * - API responses
 * - Data extraction
 * - Form filling
 * - Database operations
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function structuredOutput() {
  try {
    console.log('📋 Structured output example...\n');

    const text = `
      John Smith is a 35-year-old software engineer from San Francisco.
      He has 10 years of experience and specializes in JavaScript and Python.
      His email is john.smith@email.com and he works at TechCorp Inc.
    `;

    console.log('📝 Input text:', text);
    console.log('\n⏳ Extracting structured data...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Extract information and return it as valid JSON. Use this schema: {name: string, age: number, profession: string, experience: number, skills: string[], email: string, company: string}'
        },
        {
          role: 'user',
          content: `Extract structured information from this text:\n\n${text}`
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }, // Request JSON format
    });

    const jsonResponse = JSON.parse(response.choices[0].message.content);
    
    console.log('✅ Structured output:');
    console.log(JSON.stringify(jsonResponse, null, 2));
    console.log('\n💡 This structured data can be easily used in your application!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

structuredOutput();

