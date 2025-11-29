/**
 * 17 - Context Management
 * 
 * This script demonstrates how to manage conversation
 * context efficiently, including context window limits.
 * 
 * Learn about:
 * - Token limits
 * - Context window management
 * - Conversation history
 * - Memory optimization
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ConversationManager {
  constructor(maxMessages = 10) {
    this.messages = [];
    this.maxMessages = maxMessages;
  }

  addMessage(role, content) {
    this.messages.push({ role, content });
    
    // Keep only recent messages to manage context
    if (this.messages.length > this.maxMessages) {
      // Keep system message and recent messages
      const systemMsg = this.messages.find(m => m.role === 'system');
      const recentMsgs = this.messages.slice(-this.maxMessages + 1);
      this.messages = systemMsg ? [systemMsg, ...recentMsgs] : recentMsgs;
    }
  }

  getMessages() {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}

async function contextManagement() {
  try {
    console.log('🧠 Context management example...\n');

    const manager = new ConversationManager(6); // Keep last 6 messages
    
    manager.addMessage('system', 'You are a helpful coding assistant.');
    
    // Simulate a long conversation
    const topics = [
      'What is JavaScript?',
      'How do I use arrays?',
      'Explain async/await',
      'What are promises?',
      'How do I handle errors?',
      'What is destructuring?',
      'Explain closures',
      'What are arrow functions?'
    ];

    for (let i = 0; i < topics.length; i++) {
      manager.addMessage('user', topics[i]);
      
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: manager.getMessages(),
        max_tokens: 100,
      });

      const answer = response.choices[0].message.content;
      manager.addMessage('assistant', answer);

      console.log(`💬 Turn ${i + 1}: ${topics[i]}`);
      console.log(`📝 Context size: ${manager.getMessages().length} messages`);
      console.log(`🤖 Response: ${answer.substring(0, 60)}...\n`);
    }

    console.log('✅ Context managed efficiently throughout conversation!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

contextManagement();

