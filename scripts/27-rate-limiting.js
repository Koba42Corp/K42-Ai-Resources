/**
 * 27 - Rate Limiting and Retry Logic
 * 
 * This script demonstrates how to handle rate limits and
 * implement retry logic for API calls.
 * 
 * Essential for production applications!
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiter with exponential backoff
class RateLimiter {
  constructor(maxRetries = 3, baseDelay = 1000) {
    this.maxRetries = maxRetries;
    this.baseDelay = baseDelay;
  }

  async executeWithRetry(fn, retryCount = 0) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && retryCount < this.maxRetries) {
        const delay = this.baseDelay * Math.pow(2, retryCount); // Exponential backoff
        console.log(`⏳ Rate limited. Retrying in ${delay}ms... (attempt ${retryCount + 1}/${this.maxRetries})`);
        await this.sleep(delay);
        return this.executeWithRetry(fn, retryCount + 1);
      }
      throw error;
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Simple rate limiter - delay between requests
class SimpleRateLimiter {
  constructor(requestsPerSecond = 2) {
    this.minDelay = 1000 / requestsPerSecond;
    this.lastRequestTime = 0;
  }

  async waitIfNeeded() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minDelay) {
      const waitTime = this.minDelay - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }
}

async function rateLimiting() {
  try {
    console.log('⏱️  Rate limiting example...\n');

    const rateLimiter = new SimpleRateLimiter(2); // 2 requests per second
    const retryLimiter = new RateLimiter(3, 1000);

    console.log('📤 Making multiple requests with rate limiting...\n');

    const requests = [
      'Explain async/await',
      'What are promises?',
      'Describe closures',
      'Explain destructuring'
    ];

    for (let i = 0; i < requests.length; i++) {
      await rateLimiter.waitIfNeeded();
      
      console.log(`Request ${i + 1}: ${requests[i]}`);
      
      await retryLimiter.executeWithRetry(async () => {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: requests[i] }
          ],
          max_tokens: 50,
        });
        
        console.log(`✅ Response: ${response.choices[0].message.content.substring(0, 50)}...\n`);
        return response;
      });
    }

    console.log('✅ All requests completed with rate limiting!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

rateLimiting();

