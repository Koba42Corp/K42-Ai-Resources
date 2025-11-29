/**
 * 01 - Basic Setup and Configuration
 * 
 * This script demonstrates how to set up the OpenAI API client
 * and configure it with your API key. This is the foundation
 * for all other scripts in this library.
 * 
 * Prerequisites:
 * - Node.js installed
 * - npm install openai dotenv
 * - Create a .env file with: OPENAI_API_KEY=your_key_here
 */

require('dotenv').config();
const { OpenAI } = require('openai');

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Verify the setup
async function verifySetup() {
  try {
    console.log('🔧 Verifying OpenAI API setup...\n');
    
    // Make a simple test call
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Say "Hello, AI setup successful!" in one sentence.' }
      ],
      max_tokens: 20,
    });

    console.log('✅ Setup successful!');
    console.log('📝 Response:', response.choices[0].message.content);
    console.log('\n🎉 You\'re ready to start building with AI!');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 Make sure you have:');
    console.log('   1. Created a .env file');
    console.log('   2. Added OPENAI_API_KEY=your_key_here');
    console.log('   3. Installed dependencies: npm install openai dotenv');
  }
}

verifySetup();

