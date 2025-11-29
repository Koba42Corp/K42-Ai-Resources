/**
 * 26 - Simple Chatbot
 * 
 * This script demonstrates how to build a simple interactive
 * chatbot using Node.js readline for user input.
 * 
 * Use cases:
 * - Interactive assistants
 * - Command-line tools
 * - User interfaces
 * - Prototyping
 */

require('dotenv').config();
const { OpenAI } = require('openai');
const readline = require('readline');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class SimpleChatbot {
  constructor() {
    this.conversationHistory = [
      {
        role: 'system',
        content: 'You are a helpful and friendly assistant. Keep responses concise and conversational.'
      }
    ];
  }

  async chat(userInput) {
    this.conversationHistory.push({
      role: 'user',
      content: userInput
    });

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: this.conversationHistory,
        max_tokens: 150,
      });

      const aiResponse = response.choices[0].message.content;
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      return aiResponse;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  clearHistory() {
    this.conversationHistory = [
      {
        role: 'system',
        content: 'You are a helpful and friendly assistant.'
      }
    ];
  }
}

async function simpleChatbot() {
  console.log('🤖 Simple Chatbot');
  console.log('Type "exit" to quit, "clear" to reset conversation\n');

  const chatbot = new SimpleChatbot();

  const askQuestion = () => {
    rl.question('You: ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log('\n👋 Goodbye!');
        rl.close();
        return;
      }

      if (input.toLowerCase() === 'clear') {
        chatbot.clearHistory();
        console.log('🧹 Conversation cleared!\n');
        askQuestion();
        return;
      }

      if (input.trim() === '') {
        askQuestion();
        return;
      }

      process.stdout.write('🤖 AI: ');
      const response = await chatbot.chat(input);
      console.log(response + '\n');
      askQuestion();
    });
  };

  askQuestion();
}

simpleChatbot();

