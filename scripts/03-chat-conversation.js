/**
 * 03 - Chat Conversation
 * 
 * This script demonstrates a multi-turn conversation with AI.
 * The AI maintains context across multiple messages.
 * 
 * Use cases:
 * - Interactive chatbots
 * - Follow-up questions
 * - Contextual conversations
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatConversation() {
  try {
    console.log('💬 Starting a chat conversation...\n');

    // First message
    const messages = [
      {
        role: 'user',
        content: 'I want to learn JavaScript. Where should I start?'
      }
    ];

    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    console.log('👤 User:', messages[0].content);
    console.log('🤖 AI:', response.choices[0].message.content);
    console.log('\n---\n');

    // Add AI response to conversation history
    messages.push(response.choices[0].message);

    // Follow-up question
    messages.push({
      role: 'user',
      content: 'What about frameworks? Should I learn React or Vue first?'
    });

    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages, // AI now has full context
    });

    console.log('👤 User:', messages[messages.length - 1].content);
    console.log('🤖 AI:', response.choices[0].message.content);
    console.log('\n✅ Notice how the AI remembers the previous conversation!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

chatConversation();

