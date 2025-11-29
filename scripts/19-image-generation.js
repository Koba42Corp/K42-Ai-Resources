/**
 * 19 - Image Generation
 * 
 * This script demonstrates how to generate images using
 * OpenAI's DALL-E API.
 * 
 * Use cases:
 * - Art generation
 * - Marketing visuals
 * - Concept visualization
 * - Creative projects
 */

require('dotenv').config();
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function imageGeneration() {
  try {
    console.log('🎨 Image generation example...\n');

    const prompt = 'A futuristic robot painting a beautiful sunset over a digital landscape, cyberpunk style, highly detailed';

    console.log('📝 Prompt:', prompt);
    console.log('⏳ Generating image...\n');

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url',
    });

    const imageUrl = response.data[0].url;
    console.log('✅ Image generated successfully!');
    console.log('🖼️  Image URL:', imageUrl);
    console.log('\n💡 You can download this image or use it in your applications!');
    console.log('💡 Note: DALL-E 3 requires a paid OpenAI account.');
  } catch (error) {
    if (error.status === 402) {
      console.error('❌ Payment required: DALL-E image generation requires a paid OpenAI account.');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

imageGeneration();

