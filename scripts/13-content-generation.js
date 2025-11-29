/**
 * 13 - Content Generation
 * 
 * This script demonstrates generating various types of
 * content like blog posts, social media posts, and emails.
 * 
 * Use cases:
 * - Blog writing
 * - Social media content
 * - Email campaigns
 * - Marketing copy
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function contentGeneration() {
  try {
    console.log('📝 Content generation examples...\n');

    // Blog post outline
    console.log('📰 Generating blog post outline...\n');
    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Create a blog post outline about "Getting Started with AI Development" with 5 main sections and 3 sub-points each.'
        }
      ],
      temperature: 0.7,
    });
    console.log(response.choices[0].message.content);
    console.log('\n---\n');

    // Social media post
    console.log('📱 Generating social media post...\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Write an engaging Twitter post (under 280 characters) about learning AI programming. Include a call-to-action.'
        }
      ],
      temperature: 0.8,
      max_tokens: 100,
    });
    console.log(response.choices[0].message.content);
    console.log('\n---\n');

    // Email subject line
    console.log('📧 Generating email subject lines...\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Generate 5 compelling email subject lines for a newsletter about AI development tips.'
        }
      ],
      temperature: 0.9,
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

contentGeneration();

