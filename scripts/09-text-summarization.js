/**
 * 09 - Text Summarization
 * 
 * This script demonstrates how to summarize long texts
 * using AI. Useful for processing large documents.
 * 
 * Use cases:
 * - Article summaries
 * - Meeting notes
 * - Document abstracts
 * - Content extraction
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function textSummarization() {
  try {
    console.log('📄 Text summarization example...\n');

    const longText = `
      Artificial Intelligence (AI) has revolutionized numerous industries, from healthcare 
      to finance, transportation to entertainment. Machine learning algorithms can now 
      diagnose diseases with remarkable accuracy, predict stock market trends, drive 
      autonomous vehicles, and create stunning visual art. The field continues to evolve 
      rapidly, with new breakthroughs in natural language processing, computer vision, 
      and reinforcement learning. As AI becomes more accessible through APIs and cloud 
      services, developers are integrating these capabilities into applications at an 
      unprecedented rate. However, this rapid advancement also raises important questions 
      about ethics, bias, privacy, and the future of work. Responsible AI development 
      requires careful consideration of these factors to ensure technology benefits all 
      of humanity.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a concise summarizer. Create brief, informative summaries.'
        },
        {
          role: 'user',
          content: `Summarize this text in 2-3 sentences:\n\n${longText}`
        }
      ],
      max_tokens: 100,
    });

    console.log('📝 Original text length:', longText.length, 'characters\n');
    console.log('📋 Summary:');
    console.log(response.choices[0].message.content);
    console.log('\n✅ Text successfully summarized!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

textSummarization();

