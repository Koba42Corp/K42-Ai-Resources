/**
 * 42 - Queue System for AI Requests
 * 
 * This script demonstrates implementing a queue system
 * for managing AI API requests efficiently.
 * 
 * Use cases:
 * - Rate limit management
 * - Request prioritization
 * - Background processing
 * - Load balancing
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple queue implementation
class AIRequestQueue {
  constructor(concurrency = 2) {
    this.queue = [];
    this.processing = 0;
    this.concurrency = concurrency;
  }

  async add(request, priority = 0) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, priority, resolve, reject });
      this.queue.sort((a, b) => b.priority - a.priority); // Higher priority first
      this.process();
    });
  }

  async process() {
    if (this.processing >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.processing++;
    const { request, resolve, reject } = this.queue.shift();

    try {
      const response = await openai.chat.completions.create(request);
      resolve(response);
    } catch (error) {
      reject(error);
    } finally {
      this.processing--;
      this.process(); // Process next item
    }
  }

  getStatus() {
    return {
      queued: this.queue.length,
      processing: this.processing,
      total: this.queue.length + this.processing
    };
  }
}

async function queueSystem() {
  try {
    console.log('📋 Queue system example...\n');

    const queue = new AIRequestQueue(2); // Process 2 at a time

    const requests = [
      { prompt: 'Explain JavaScript', priority: 1 },
      { prompt: 'What is Python?', priority: 2 },
      { prompt: 'Describe React', priority: 1 },
      { prompt: 'What is Node.js?', priority: 3 }, // Higher priority
      { prompt: 'Explain async/await', priority: 1 }
    ];

    console.log(`📤 Adding ${requests.length} requests to queue...\n`);

    const promises = requests.map((req, index) => {
      console.log(`  ${index + 1}. Queued: "${req.prompt}" (priority: ${req.priority})`);
      
      return queue.add({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: req.prompt }],
        max_tokens: 30,
      }, req.priority).then(response => {
        console.log(`  ✅ Completed: "${req.prompt}"`);
        return response.choices[0].message.content;
      });
    });

    // Monitor queue status
    const statusInterval = setInterval(() => {
      const status = queue.getStatus();
      if (status.total > 0) {
        console.log(`📊 Queue status: ${status.queued} queued, ${status.processing} processing`);
      }
    }, 500);

    await Promise.all(promises);
    clearInterval(statusInterval);

    console.log('\n✅ All requests processed!');
    console.log('💡 Queue system helps manage rate limits and prioritize requests!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

queueSystem();

