/**
 * 41 - Webhook Simulation
 * 
 * This script demonstrates how to process AI responses
 * and trigger webhooks or callbacks (simulated).
 * 
 * Use cases:
 * - Event-driven architectures
 * - Notifications
 * - Integration with other services
 * - Async processing
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simulated webhook/callback system
class WebhookManager {
  constructor() {
    this.webhooks = [];
  }

  register(url, event) {
    this.webhooks.push({ url, event });
    console.log(`📡 Registered webhook: ${url} for event: ${event}`);
  }

  async trigger(event, data) {
    const relevantWebhooks = this.webhooks.filter(w => w.event === event);
    
    console.log(`\n🔔 Triggering ${relevantWebhooks.length} webhook(s) for event: ${event}`);
    
    for (const webhook of relevantWebhooks) {
      // In production, make actual HTTP request
      console.log(`  → POST ${webhook.url}`);
      console.log(`    Data: ${JSON.stringify(data, null, 2)}`);
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

async function webhookSimulation() {
  try {
    console.log('🔗 Webhook simulation example...\n');

    const webhookManager = new WebhookManager();
    
    // Register webhooks
    webhookManager.register('https://api.example.com/notify', 'ai_response');
    webhookManager.register('https://api.example.com/log', 'ai_response');
    webhookManager.register('https://api.example.com/analytics', 'ai_complete');

    // Process AI request
    console.log('⏳ Processing AI request...');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Explain webhooks in one sentence.' }
      ],
      max_tokens: 50,
    });

    const aiResponse = response.choices[0].message.content;
    console.log('✅ AI Response:', aiResponse);

    // Trigger webhooks
    await webhookManager.trigger('ai_response', {
      response: aiResponse,
      tokens: response.usage.total_tokens,
      timestamp: new Date().toISOString()
    });

    await webhookManager.trigger('ai_complete', {
      status: 'success',
      duration: '500ms'
    });

    console.log('\n✅ Webhooks triggered successfully!');
    console.log('💡 In production, use libraries like axios or fetch for real HTTP calls!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

webhookSimulation();

