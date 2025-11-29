/**
 * 20 - Image Variations and Editing
 * 
 * This script demonstrates working with image variations
 * and editing capabilities (when available).
 * 
 * Note: Some features may require specific API versions
 */

require('dotenv').config();
const { OpenAI } = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function imageVariations() {
  try {
    console.log('🖼️  Image variations example...\n');
    console.log('💡 This example shows how to work with image APIs.');
    console.log('💡 For variations, you would need an existing image file.\n');

    // Example: Generate an image first
    console.log('1️⃣ Generating base image...\n');
    const baseImage = await openai.images.generate({
      model: 'dall-e-3',
      prompt: 'A simple geometric pattern, minimalist design',
      n: 1,
      size: '1024x1024',
    });

    console.log('✅ Base image URL:', baseImage.data[0].url);
    console.log('\n💡 With the base image, you could:');
    console.log('   - Create variations');
    console.log('   - Edit specific regions');
    console.log('   - Generate similar styles');
    console.log('\n📚 Check OpenAI API docs for latest image editing features!');
  } catch (error) {
    if (error.status === 402) {
      console.log('💡 Image generation requires a paid OpenAI account.');
      console.log('💡 This script demonstrates the pattern for image operations.');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
}

imageVariations();

