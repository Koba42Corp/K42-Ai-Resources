/**
 * 21 - Text Embeddings (Basic)
 * 
 * This script demonstrates how to create embeddings from text.
 * Embeddings are vector representations that capture semantic meaning.
 * 
 * Use cases:
 * - Semantic search
 * - Similarity matching
 * - Clustering
 * - Recommendation systems
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function embeddingsBasic() {
  try {
    console.log('🔢 Text embeddings example...\n');

    const texts = [
      'I love programming in JavaScript',
      'JavaScript is my favorite programming language',
      'The weather is sunny today',
      'It is a beautiful sunny day outside'
    ];

    console.log('📝 Creating embeddings for texts...\n');

    for (const text of texts) {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      const embedding = response.data[0].embedding;
      console.log(`Text: "${text}"`);
      console.log(`Embedding dimension: ${embedding.length}`);
      console.log(`First 5 values: [${embedding.slice(0, 5).map(v => v.toFixed(4)).join(', ')}...]`);
      console.log('');
    }

    console.log('✅ Embeddings created!');
    console.log('💡 Use these vectors for similarity calculations and semantic search!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

embeddingsBasic();

