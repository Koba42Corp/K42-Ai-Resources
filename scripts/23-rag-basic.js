/**
 * 23 - RAG (Retrieval Augmented Generation) - Basic
 * 
 * This script demonstrates a basic RAG pattern: retrieve relevant
 * context and use it to generate accurate responses.
 * 
 * Use cases:
 * - Document Q&A systems
 * - Knowledge bases
 * - Contextual chatbots
 * - Information retrieval
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple cosine similarity (from previous script)
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

async function ragBasic() {
  try {
    console.log('📚 RAG (Retrieval Augmented Generation) example...\n');

    // Knowledge base
    const knowledgeBase = [
      'OpenAI was founded in 2015 by Elon Musk, Sam Altman, and others.',
      'GPT-3 was released in 2020 and has 175 billion parameters.',
      'ChatGPT was launched in November 2022 and gained 100 million users in 2 months.',
      'DALL-E is an AI system that creates images from text descriptions.',
      'The OpenAI API provides access to various AI models including GPT-4 and DALL-E.'
    ];

    const question = 'When was ChatGPT launched and how many users did it gain?';

    console.log('📖 Knowledge base:', knowledgeBase.length, 'documents');
    console.log('❓ Question:', question);
    console.log('\n⏳ Retrieving relevant context...\n');

    // Step 1: Create embeddings for knowledge base
    const kbEmbeddings = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: knowledgeBase,
    });

    // Step 2: Create embedding for question
    const questionEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: question,
    });

    // Step 3: Find most relevant documents
    const questionVec = questionEmbedding.data[0].embedding;
    const similarities = kbEmbeddings.data.map((doc, index) => ({
      text: knowledgeBase[index],
      similarity: cosineSimilarity(questionVec, doc.embedding)
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);
    const relevantContext = similarities.slice(0, 2).map(s => s.text).join('\n');

    console.log('📋 Retrieved context:');
    console.log(relevantContext);
    console.log('\n⏳ Generating answer with context...\n');

    // Step 4: Generate answer using retrieved context
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Answer the question based only on the provided context. If the answer is not in the context, say so.'
        },
        {
          role: 'user',
          content: `Context:\n${relevantContext}\n\nQuestion: ${question}`
        }
      ],
    });

    console.log('✅ Answer:');
    console.log(response.choices[0].message.content);
    console.log('\n💡 RAG combines retrieval (finding relevant info) with generation (creating answers)!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

ragBasic();

