/**
 * 28 - Response Caching
 * 
 * This script demonstrates how to cache AI responses to
 * save costs and improve performance.
 * 
 * Use cases:
 * - Cost optimization
 * - Performance improvement
 * - Repeated queries
 * - Offline capabilities
 */

require('dotenv').config();
const { OpenAI } = require('openai');
const crypto = require('crypto');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory cache
class ResponseCache {
  constructor() {
    this.cache = new Map();
  }

  getKey(messages) {
    // Create a hash of the messages for cache key
    const keyString = JSON.stringify(messages);
    return crypto.createHash('md5').update(keyString).digest('hex');
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

async function caching() {
  try {
    console.log('💾 Response caching example...\n');

    const cache = new ResponseCache();

    const query = 'What is JavaScript?';

    // First request - cache miss
    console.log('1️⃣ First request (cache miss)...');
    const cacheKey = cache.getKey([{ role: 'user', content: query }]);
    
    if (cache.has(cacheKey)) {
      console.log('✅ Found in cache!');
      console.log(cache.get(cacheKey));
    } else {
      console.log('⏳ Making API call...');
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: query }
        ],
        max_tokens: 100,
      });

      const result = response.choices[0].message.content;
      cache.set(cacheKey, result);
      console.log('✅ Response:', result);
      console.log('💾 Cached for future use\n');
    }

    // Second request - cache hit
    console.log('2️⃣ Second request (cache hit)...');
    if (cache.has(cacheKey)) {
      console.log('✅ Found in cache!');
      console.log('📝 Response:', cache.get(cacheKey));
      console.log('💰 No API call needed - saved money!');
    }

    console.log(`\n📊 Cache size: ${cache.size()} entries`);
    console.log('💡 In production, use Redis or similar for persistent caching!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

caching();

