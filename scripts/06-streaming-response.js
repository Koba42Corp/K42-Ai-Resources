/**
 * 06 - Streaming Responses
 * 
 * This script demonstrates how to stream AI responses
 * in real-time, providing a better user experience.
 * 
 * Use cases:
 * - Real-time chatbots
 * - Progressive text display
 * - Better perceived performance
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function streamingResponse() {
  try {
    console.log('🌊 Streaming response in real-time...\n');
    console.log('🤖 AI Response (streaming):\n');

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Write a short story about a robot learning to paint, one sentence at a time.'
        }
      ],
      stream: true, // Enable streaming
    });

    // Process the stream
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        process.stdout.write(content); // Write without newline for smooth streaming
      }
    }

    console.log('\n\n✅ Streaming complete!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

streamingResponse();

