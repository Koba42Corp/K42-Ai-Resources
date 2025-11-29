/**
 * 51 - Advanced RAG with Chunking
 * 
 * This script demonstrates an advanced RAG implementation
 * with text chunking for better retrieval.
 * 
 * Use cases:
 * - Large document processing
 * - Knowledge bases
 * - Document Q&A
 * - Information retrieval
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Text chunking utility
class TextChunker {
  chunkText(text, chunkSize = 500, overlap = 50) {
    const chunks = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      chunks.push(text.slice(start, end));
      start = end - overlap; // Overlap for context
    }

    return chunks;
  }
}

// Cosine similarity (from earlier scripts)
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function advancedRAG() {
  try {
    console.log('📚 Advanced RAG with chunking...\n');

    // Large document
    const document = `
      JavaScript is a high-level programming language. It was created by Brendan Eich in 1995.
      JavaScript is used for web development, both client-side and server-side. Modern JavaScript
      includes features like arrow functions, async/await, classes, and modules. The language
      supports both object-oriented and functional programming paradigms. JavaScript engines like
      V8 power modern browsers and Node.js. The ecosystem includes frameworks like React, Vue,
      and Angular for building user interfaces. Node.js enables server-side JavaScript development.
      TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
    `.repeat(2); // Make it longer

    console.log('📄 Document length:', document.length, 'characters');
    console.log('⏳ Chunking document...\n');

    // Step 1: Chunk the document
    const chunker = new TextChunker();
    const chunks = chunker.chunkText(document, 300, 50);
    console.log(`📦 Created ${chunks.length} chunks\n`);

    // Step 2: Create embeddings for chunks
    console.log('⏳ Creating embeddings for chunks...');
    const chunkEmbeddings = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunks,
    });

    // Step 3: Query
    const query = 'What is JavaScript used for?';
    console.log(`\n🔎 Query: "${query}"`);
    console.log('⏳ Finding relevant chunks...\n');

    const queryEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });

    // Step 4: Find most relevant chunks
    const queryVec = queryEmbedding.data[0].embedding;
    const similarities = chunkEmbeddings.data.map((chunk, index) => ({
      chunk: chunks[index],
      similarity: cosineSimilarity(queryVec, chunk.embedding),
      index
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);
    const topChunks = similarities.slice(0, 2);

    console.log('📋 Top relevant chunks:');
    topChunks.forEach((item, i) => {
      console.log(`\n${i + 1}. Similarity: ${item.similarity.toFixed(4)}`);
      console.log(`   Chunk: ${item.chunk.substring(0, 100)}...`);
    });

    // Step 5: Generate answer with context
    const context = topChunks.map(item => item.chunk).join('\n\n');
    console.log('\n⏳ Generating answer...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Answer based only on the provided context.'
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${query}`
        }
      ],
    });

    console.log('✅ Answer:', response.choices[0].message.content);
    console.log('\n💡 Chunking improves retrieval for large documents!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

advancedRAG();

