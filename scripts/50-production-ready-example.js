/**
 * 50 - Production-Ready AI Integration
 * 
 * This script combines multiple best practices into a
 * production-ready AI integration example.
 * 
 * Includes:
 * - Error handling
 * - Rate limiting
 * - Caching
 * - Logging
 * - Cost tracking
 * - Retry logic
 */

require('dotenv').config();
const { OpenAI } = require('openai');
const crypto = require('crypto');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Production-ready AI service
class ProductionAIService {
  constructor() {
    this.cache = new Map();
    this.logs = [];
    this.costTracker = { total: 0, requests: 0 };
    this.rateLimiter = { lastRequest: 0, minDelay: 500 };
  }

  async processRequest(prompt, options = {}) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();

    this.log('info', 'Request started', { requestId, prompt: prompt.substring(0, 50) });

    try {
      // Check cache
      const cacheKey = this.getCacheKey(prompt, options);
      if (this.cache.has(cacheKey)) {
        this.log('info', 'Cache hit', { requestId });
        return this.cache.get(cacheKey);
      }

      // Rate limiting
      await this.applyRateLimit();

      // Retry logic
      const response = await this.retryRequest(async () => {
        return await openai.chat.completions.create({
          model: options.model || 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: options.maxTokens || 150,
          temperature: options.temperature || 0.7,
        });
      });

      // Track costs
      const cost = this.estimateCost(response.usage.total_tokens, options.model);
      this.costTracker.total += cost;
      this.costTracker.requests++;

      // Cache result
      this.cache.set(cacheKey, response);

      const duration = Date.now() - startTime;
      this.log('info', 'Request completed', {
        requestId,
        duration: `${duration}ms`,
        tokens: response.usage.total_tokens,
        cost: `$${cost.toFixed(4)}`
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.log('error', 'Request failed', {
        requestId,
        duration: `${duration}ms`,
        error: error.message
      });
      throw error;
    }
  }

  async retryRequest(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        if (error.status === 429) {
          await this.sleep(1000 * Math.pow(2, i)); // Exponential backoff
        } else {
          throw error;
        }
      }
    }
  }

  async applyRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.rateLimiter.lastRequest;
    if (timeSinceLastRequest < this.rateLimiter.minDelay) {
      await this.sleep(this.rateLimiter.minDelay - timeSinceLastRequest);
    }
    this.rateLimiter.lastRequest = Date.now();
  }

  getCacheKey(prompt, options) {
    return crypto.createHash('md5')
      .update(prompt + JSON.stringify(options))
      .digest('hex');
  }

  estimateCost(tokens, model) {
    const pricing = model?.includes('gpt-4') ? 0.03 : 0.002;
    return (tokens / 1000) * pricing;
  }

  log(level, message, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...data
    };
    this.logs.push(entry);
    console.log(`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`, data);
  }

  getStats() {
    return {
      totalRequests: this.costTracker.requests,
      totalCost: this.costTracker.total,
      cacheSize: this.cache.size,
      logsCount: this.logs.length
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function productionReadyExample() {
  try {
    console.log('🚀 Production-ready AI integration example...\n');

    const service = new ProductionAIService();

    // Process multiple requests
    const prompts = [
      'Explain async/await',
      'What is JavaScript?',
      'Describe React'
    ];

    for (const prompt of prompts) {
      const response = await service.processRequest(prompt);
      console.log(`\n📝 Prompt: ${prompt}`);
      console.log(`✅ Response: ${response.choices[0].message.content.substring(0, 60)}...`);
    }

    // Show stats
    const stats = service.getStats();
    console.log('\n📊 Service Statistics:');
    console.log(`  Total Requests: ${stats.totalRequests}`);
    console.log(`  Total Cost: $${stats.totalCost.toFixed(4)}`);
    console.log(`  Cache Size: ${stats.cacheSize} entries`);
    console.log(`  Logs: ${stats.logsCount} entries`);

    console.log('\n✅ Production-ready service with all best practices!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

productionReadyExample();

