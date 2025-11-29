/**
 * 43 - Error Recovery and Fallbacks
 * 
 * This script demonstrates implementing error recovery
 * and fallback strategies for AI API calls.
 * 
 * Essential for production resilience!
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback responses
const fallbackResponses = {
  timeout: 'I apologize, but I\'m experiencing delays. Please try again in a moment.',
  rateLimit: 'I\'m currently handling many requests. Please wait a moment and try again.',
  error: 'I encountered an error processing your request. Please try again.',
  default: 'I\'m having trouble right now. Please try again later.'
};

class ResilientAIClient {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.fallbackModel = 'gpt-3.5-turbo'; // Fallback to cheaper model
  }

  async chatWithFallback(messages, options = {}) {
    const primaryModel = options.model || 'gpt-4';
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}: Trying ${primaryModel}...`);
        
        const response = await Promise.race([
          this.openai.chat.completions.create({
            model: primaryModel,
            messages,
            ...options
          }),
          this.timeoutPromise(10000) // 10 second timeout
        ]);

        return response;
      } catch (error) {
        console.log(`  ❌ Attempt ${attempt} failed: ${error.message}`);

        if (attempt === maxRetries) {
          // Final fallback: try cheaper model
          if (primaryModel !== this.fallbackModel) {
            console.log(`  🔄 Trying fallback model: ${this.fallbackModel}...`);
            try {
              return await this.openai.chat.completions.create({
                model: this.fallbackModel,
                messages,
                ...options
              });
            } catch (fallbackError) {
              return this.getFallbackResponse(error);
            }
          }
          return this.getFallbackResponse(error);
        }

        // Wait before retry
        await this.sleep(1000 * attempt);
      }
    }
  }

  timeoutPromise(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), ms);
    });
  }

  getFallbackResponse(error) {
    if (error.message.includes('timeout')) {
      return { choices: [{ message: { content: fallbackResponses.timeout } }] };
    } else if (error.status === 429) {
      return { choices: [{ message: { content: fallbackResponses.rateLimit } }] };
    } else {
      return { choices: [{ message: { content: fallbackResponses.error } }] };
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function errorRecovery() {
  try {
    console.log('🛡️  Error recovery and fallbacks example...\n');

    const client = new ResilientAIClient();

    const response = await client.chatWithFallback([
      { role: 'user', content: 'Explain error handling in one sentence.' }
    ], {
      model: 'gpt-3.5-turbo', // Using available model
      max_tokens: 50
    });

    console.log('\n✅ Response:', response.choices[0].message.content);
    console.log('\n💡 Fallback strategies ensure your app stays resilient!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

errorRecovery();

