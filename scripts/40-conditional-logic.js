/**
 * 40 - Conditional Logic with AI
 * 
 * This script demonstrates using AI responses to make
 * conditional decisions in your application logic.
 * 
 * Use cases:
 * - Dynamic routing
 * - Decision making
 * - Workflow automation
 * - Smart responses
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function conditionalLogic() {
  try {
    console.log('🔀 Conditional logic with AI...\n');

    const userQueries = [
      'I need help with billing',
      'How do I reset my password?',
      'I want to cancel my account',
      'What are your business hours?'
    ];

    for (const query of userQueries) {
      console.log(`📝 User query: "${query}"`);

      // Use AI to determine intent
      const intentResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Classify the user intent. Respond with only one word: BILLING, SUPPORT, CANCEL, INFO'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.3,
        max_tokens: 10,
      });

      const intent = intentResponse.choices[0].message.content.trim().toUpperCase();

      // Conditional logic based on AI response
      let action;
      switch (intent) {
        case 'BILLING':
          action = 'Route to billing department';
          break;
        case 'SUPPORT':
          action = 'Route to technical support';
          break;
        case 'CANCEL':
          action = 'Route to retention team';
          break;
        case 'INFO':
          action = 'Provide automated response';
          break;
        default:
          action = 'Route to general support';
      }

      console.log(`🎯 Detected intent: ${intent}`);
      console.log(`⚡ Action: ${action}`);
      console.log('');
    }

    console.log('✅ Conditional routing complete!');
    console.log('💡 Use AI to make smart decisions in your application flow!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

conditionalLogic();

