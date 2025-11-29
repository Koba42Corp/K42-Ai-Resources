/**
 * 16 - Batch Processing
 * 
 * This script demonstrates how to process multiple
 * items efficiently using AI in batches.
 * 
 * Use cases:
 * - Processing large datasets
 * - Bulk operations
 * - Parallel processing
 * - Efficient API usage
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function processBatch(items, batchSize = 3) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}...`);
    
    // Process batch in parallel
    const promises = batch.map(async (item) => {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Summarize this in one sentence: "${item}"`
            }
          ],
          max_tokens: 50,
        });
        return {
          original: item,
          summary: response.choices[0].message.content
        };
      } catch (error) {
        return {
          original: item,
          error: error.message
        };
      }
    });

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

async function batchProcessing() {
  try {
    console.log('📦 Batch processing example...\n');

    const items = [
      'Artificial Intelligence is transforming healthcare with diagnostic tools.',
      'Machine learning algorithms can predict weather patterns accurately.',
      'Natural language processing enables chatbots to understand human language.',
      'Computer vision allows autonomous vehicles to navigate roads safely.',
      'Deep learning models can generate realistic images and art.',
      'AI-powered recommendation systems personalize user experiences.'
    ];

    console.log(`Processing ${items.length} items in batches...\n`);
    const results = await processBatch(items, 3);

    console.log('\n📊 Results:\n');
    results.forEach((result, index) => {
      console.log(`${index + 1}. Original: ${result.original}`);
      if (result.summary) {
        console.log(`   Summary: ${result.summary}`);
      } else {
        console.log(`   Error: ${result.error}`);
      }
      console.log('');
    });

    console.log(`✅ Processed ${results.length} items successfully!`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

batchProcessing();

