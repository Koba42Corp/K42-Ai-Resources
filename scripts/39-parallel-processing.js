/**
 * 39 - Parallel Processing
 * 
 * This script demonstrates how to process multiple AI
 * requests in parallel for better performance.
 * 
 * Use cases:
 * - Batch operations
 * - Performance optimization
 * - Concurrent processing
 * - Throughput improvement
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function parallelProcessing() {
  try {
    console.log('⚡ Parallel processing example...\n');

    const prompts = [
      'Explain JavaScript in one sentence',
      'What is Python?',
      'Describe React',
      'What is Node.js?',
      'Explain async/await'
    ];

    console.log(`📝 Processing ${prompts.length} prompts in parallel...\n`);

    const startTime = Date.now();

    // Process all requests in parallel
    const promises = prompts.map(async (prompt, index) => {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 50,
        });

        return {
          index: index + 1,
          prompt,
          response: response.choices[0].message.content,
          tokens: response.usage.total_tokens
        };
      } catch (error) {
        return {
          index: index + 1,
          prompt,
          error: error.message
        };
      }
    });

    const results = await Promise.all(promises);
    const duration = Date.now() - startTime;

    console.log('📊 Results:\n');
    results.forEach(result => {
      if (result.error) {
        console.log(`${result.index}. ❌ Error: ${result.error}`);
      } else {
        console.log(`${result.index}. ✅ ${result.prompt}`);
        console.log(`   Response: ${result.response}`);
        console.log(`   Tokens: ${result.tokens}\n`);
      }
    });

    console.log(`⏱️  Total time: ${duration}ms`);
    console.log(`⚡ Average per request: ${(duration / prompts.length).toFixed(0)}ms`);
    console.log('\n💡 Parallel processing significantly improves throughput!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

parallelProcessing();

