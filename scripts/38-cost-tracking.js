/**
 * 38 - Cost Tracking
 * 
 * This script demonstrates how to track API costs
 * and usage for budget management.
 * 
 * Essential for production applications!
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cost tracker
class CostTracker {
  constructor() {
    this.usage = {
      totalRequests: 0,
      totalTokens: 0,
      totalCost: 0,
      byModel: {}
    };

    // Pricing per 1K tokens (as of 2024, check OpenAI for latest)
    this.pricing = {
      'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
      'gpt-4': { input: 0.03, output: 0.06 },
      'gpt-4-turbo': { input: 0.01, output: 0.03 }
    };
  }

  recordUsage(model, usage, response) {
    const modelPricing = this.pricing[model] || this.pricing['gpt-3.5-turbo'];
    
    const inputCost = (usage.prompt_tokens / 1000) * modelPricing.input;
    const outputCost = (usage.completion_tokens / 1000) * modelPricing.output;
    const requestCost = inputCost + outputCost;

    this.usage.totalRequests++;
    this.usage.totalTokens += usage.total_tokens;
    this.usage.totalCost += requestCost;

    if (!this.usage.byModel[model]) {
      this.usage.byModel[model] = {
        requests: 0,
        tokens: 0,
        cost: 0
      };
    }

    this.usage.byModel[model].requests++;
    this.usage.byModel[model].tokens += usage.total_tokens;
    this.usage.byModel[model].cost += requestCost;

    return requestCost;
  }

  getReport() {
    return {
      ...this.usage,
      averageCostPerRequest: this.usage.totalCost / this.usage.totalRequests || 0
    };
  }

  reset() {
    this.usage = {
      totalRequests: 0,
      totalTokens: 0,
      totalCost: 0,
      byModel: {}
    };
  }
}

async function costTracking() {
  try {
    console.log('💰 Cost tracking example...\n');

    const tracker = new CostTracker();

    // Simulate multiple API calls
    const requests = [
      { model: 'gpt-3.5-turbo', prompt: 'Explain JavaScript' },
      { model: 'gpt-3.5-turbo', prompt: 'What is async/await?' },
      { model: 'gpt-3.5-turbo', prompt: 'Describe closures' }
    ];

    for (const req of requests) {
      const response = await openai.chat.completions.create({
        model: req.model,
        messages: [{ role: 'user', content: req.prompt }],
        max_tokens: 100,
      });

      const cost = tracker.recordUsage(req.model, response.usage, response);
      console.log(`✅ Request completed - Cost: $${cost.toFixed(6)}`);
    }

    const report = tracker.getReport();
    console.log('\n📊 Usage Report:');
    console.log(`Total Requests: ${report.totalRequests}`);
    console.log(`Total Tokens: ${report.totalTokens}`);
    console.log(`Total Cost: $${report.totalCost.toFixed(4)}`);
    console.log(`Average per Request: $${report.averageCostPerRequest.toFixed(6)}`);
    console.log('\nBy Model:');
    Object.entries(report.byModel).forEach(([model, stats]) => {
      console.log(`  ${model}:`);
      console.log(`    Requests: ${stats.requests}`);
      console.log(`    Tokens: ${stats.tokens}`);
      console.log(`    Cost: $${stats.cost.toFixed(4)}`);
    });

    console.log('\n💡 Track costs to stay within budget!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

costTracking();

