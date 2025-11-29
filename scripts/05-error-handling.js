/**
 * 05 - Error Handling
 * 
 * This script demonstrates proper error handling when
 * working with AI APIs. Essential for production code.
 * 
 * Learn about:
 * - API errors
 * - Rate limits
 * - Invalid requests
 * - Network issues
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function errorHandling() {
  try {
    console.log('🛡️ Demonstrating error handling...\n');

    // This will fail - invalid model name
    const response = await openai.chat.completions.create({
      model: 'invalid-model-name',
      messages: [
        { role: 'user', content: 'Hello' }
      ],
    });

    console.log(response);
  } catch (error) {
    // Handle different error types
    if (error.status === 401) {
      console.error('❌ Authentication Error: Invalid API key');
      console.log('💡 Check your OPENAI_API_KEY in .env file');
    } else if (error.status === 429) {
      console.error('❌ Rate Limit Error: Too many requests');
      console.log('💡 Wait a moment and try again');
    } else if (error.status === 400) {
      console.error('❌ Bad Request Error:', error.message);
      console.log('💡 Check your request parameters');
    } else if (error.status === 404) {
      console.error('❌ Not Found Error: Model or endpoint not found');
      console.log('💡 Check the model name');
    } else {
      console.error('❌ Unexpected Error:', error.message);
      console.log('💡 Check the error details:', error);
    }
  }

  // Now demonstrate successful call with proper error handling
  try {
    console.log('\n✅ Making a valid request...\n');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Say hello!' }
      ],
    });
    console.log('✅ Success:', response.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

errorHandling();

