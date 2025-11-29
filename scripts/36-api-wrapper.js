/**
 * 36 - API Wrapper Pattern
 * 
 * This script demonstrates creating a reusable wrapper
 * around the OpenAI API for cleaner code organization.
 * 
 * Use cases:
 * - Code organization
 * - Reusability
 * - Abstraction
 * - Team collaboration
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Custom API wrapper class
class AIAssistant {
  constructor(model = 'gpt-3.5-turbo') {
    this.model = model;
    this.conversationHistory = [];
  }

  async chat(message, options = {}) {
    this.conversationHistory.push({
      role: 'user',
      content: message
    });

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: this.conversationHistory,
        max_tokens: options.maxTokens || 150,
        temperature: options.temperature || 0.7,
        ...options
      });

      const aiMessage = response.choices[0].message.content;
      this.conversationHistory.push({
        role: 'assistant',
        content: aiMessage
      });

      return aiMessage;
    } catch (error) {
      throw new Error(`AI request failed: ${error.message}`);
    }
  }

  async summarize(text, length = 'short') {
    const lengthMap = {
      short: 50,
      medium: 100,
      long: 200
    };

    return await this.chat(
      `Summarize this text in ${length} format:\n\n${text}`,
      { maxTokens: lengthMap[length] || 100 }
    );
  }

  async translate(text, targetLanguage) {
    return await this.chat(
      `Translate this text to ${targetLanguage}:\n\n${text}`,
      { temperature: 0.3 }
    );
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

async function apiWrapper() {
  try {
    console.log('📦 API wrapper pattern example...\n');

    const assistant = new AIAssistant();

    // Use the wrapper methods
    console.log('1️⃣ Chat example:');
    const response = await assistant.chat('What is JavaScript?');
    console.log('Response:', response);
    console.log('');

    console.log('2️⃣ Summarize example:');
    const longText = 'JavaScript is a programming language...'.repeat(10);
    const summary = await assistant.summarize(longText, 'short');
    console.log('Summary:', summary);
    console.log('');

    console.log('3️⃣ Translate example:');
    const translation = await assistant.translate('Hello, how are you?', 'Spanish');
    console.log('Translation:', translation);
    console.log('');

    console.log('✅ Wrapper makes API calls cleaner and more reusable!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

apiWrapper();

