/**
 * 48 - Content Moderation
 * 
 * This script demonstrates using AI for content moderation
 * to filter inappropriate or harmful content.
 * 
 * Use cases:
 * - User-generated content
 * - Comment moderation
 * - Spam detection
 * - Safety filters
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class ContentModerator {
  async moderate(content) {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a content moderator. Analyze text and respond with JSON:
{
  "safe": boolean,
  "reason": string,
  "categories": string[] (options: spam, hate, harassment, inappropriate, safe)
}`
        },
        {
          role: 'user',
          content: `Moderate this content: "${content}"`
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  }

  async checkBatch(contents) {
    const results = await Promise.all(
      contents.map(async (content) => {
        const moderation = await this.moderate(content);
        return { content, ...moderation };
      })
    );
    return results;
  }
}

async function contentModeration() {
  try {
    console.log('🛡️  Content moderation example...\n');

    const moderator = new ContentModerator();

    const contents = [
      'This is a great product! I love it.',
      'Check out this amazing deal at http://spam-link.com',
      'Thank you for sharing this helpful information.',
      'I disagree with your opinion, but respect your right to have it.'
    ];

    console.log('📝 Moderating content...\n');

    const results = await moderator.checkBatch(contents);

    results.forEach((result, index) => {
      console.log(`${index + 1}. Content: "${result.content}"`);
      console.log(`   Safe: ${result.safe ? '✅' : '❌'}`);
      console.log(`   Reason: ${result.reason}`);
      if (result.categories && result.categories.length > 0) {
        console.log(`   Categories: ${result.categories.join(', ')}`);
      }
      console.log('');
    });

    console.log('✅ Content moderation complete!');
    console.log('💡 Use AI moderation to keep your platform safe!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

contentModeration();

