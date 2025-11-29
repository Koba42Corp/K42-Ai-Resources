/**
 * 30 - Multi-Model Comparison
 * 
 * This script demonstrates how to compare outputs from
 * different AI models to choose the best one for your use case.
 * 
 * Use cases:
 * - Model selection
 * - Quality comparison
 * - Cost optimization
 * - Performance testing
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function multiModelComparison() {
  try {
    console.log('🔬 Multi-model comparison...\n');

    const prompt = 'Explain quantum computing in simple terms';
    const models = ['gpt-3.5-turbo', 'gpt-4'];

    console.log('📝 Prompt:', prompt);
    console.log('🤖 Testing models:', models.join(', '));
    console.log('\n---\n');

    const results = [];

    for (const model of models) {
      console.log(`⏳ Testing ${model}...`);
      const startTime = Date.now();

      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      const result = {
        model,
        response: response.choices[0].message.content,
        tokens: response.usage.total_tokens,
        duration: `${duration}ms`,
        cost: model === 'gpt-4' ? 'Higher' : 'Lower' // Simplified
      };

      results.push(result);

      console.log(`✅ ${model} completed in ${duration}ms`);
      console.log(`📊 Tokens used: ${result.tokens}`);
      console.log(`💵 Cost: ${result.cost}\n`);
    }

    console.log('📊 Comparison Results:\n');
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.model}:`);
      console.log(`   Response: ${result.response.substring(0, 80)}...`);
      console.log(`   Tokens: ${result.tokens}`);
      console.log(`   Duration: ${result.duration}`);
      console.log(`   Cost: ${result.cost}\n`);
    });

    console.log('💡 Compare results to choose the best model for your needs!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

multiModelComparison();

