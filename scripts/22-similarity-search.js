/**
 * 22 - Similarity Search with Embeddings
 * 
 * This script demonstrates how to find similar texts using
 * embeddings and cosine similarity.
 * 
 * Use cases:
 * - Search engines
 * - Content recommendations
 * - Duplicate detection
 * - Semantic matching
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Calculate cosine similarity
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function similaritySearch() {
  try {
    console.log('🔍 Similarity search example...\n');

    const documents = [
      'Python is a popular programming language',
      'JavaScript is used for web development',
      'Machine learning uses Python extensively',
      'Web developers use JavaScript frameworks',
      'The weather forecast predicts rain tomorrow'
    ];

    const query = 'What programming language is used for AI?';

    console.log('📚 Documents:', documents);
    console.log('🔎 Query:', query);
    console.log('\n⏳ Creating embeddings...\n');

    // Create embeddings for all documents
    const docEmbeddings = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: documents,
    });

    // Create embedding for query
    const queryEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });

    const queryVec = queryEmbedding.data[0].embedding;

    // Calculate similarities
    const similarities = docEmbeddings.data.map((doc, index) => ({
      text: documents[index],
      similarity: cosineSimilarity(queryVec, doc.embedding)
    }));

    // Sort by similarity
    similarities.sort((a, b) => b.similarity - a.similarity);

    console.log('📊 Similarity Results (sorted):\n');
    similarities.forEach((item, index) => {
      console.log(`${index + 1}. Similarity: ${item.similarity.toFixed(4)}`);
      console.log(`   Text: "${item.text}"\n`);
    });

    console.log('✅ Most similar document found!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

similaritySearch();

