/**
 * 15 - Prompt Templates
 * 
 * This script demonstrates how to create reusable prompt
 * templates for consistent AI interactions.
 * 
 * Use cases:
 * - Consistent formatting
 * - Reusable patterns
 * - Template libraries
 * - Standardized outputs
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define prompt templates
const templates = {
  explainConcept: (concept, level = 'beginner') => {
    return `Explain ${concept} for a ${level} level. Include:
1. A simple definition
2. A real-world example
3. Why it's important
4. Common use cases`;
  },

  compareOptions: (option1, option2, criteria) => {
    return `Compare ${option1} and ${option2} based on:
${criteria.map(c => `- ${c}`).join('\n')}

Provide a clear recommendation.`;
  },

  generateIdeas: (topic, count = 5) => {
    return `Generate ${count} creative ideas for ${topic}. Each idea should include:
- Title
- Brief description
- Key benefits
- Implementation difficulty (Easy/Medium/Hard)`;
  }
};

async function promptTemplates() {
  try {
    console.log('📋 Using prompt templates...\n');

    // Use explainConcept template
    console.log('1️⃣ Explaining a concept:\n');
    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: templates.explainConcept('async/await', 'intermediate') }
      ],
    });
    console.log(response.choices[0].message.content);
    console.log('\n---\n');

    // Use compareOptions template
    console.log('2️⃣ Comparing options:\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: templates.compareOptions('React', 'Vue', ['Learning curve', 'Performance', 'Ecosystem', 'Job market'])
        }
      ],
    });
    console.log(response.choices[0].message.content);
    console.log('\n---\n');

    // Use generateIdeas template
    console.log('3️⃣ Generating ideas:\n');
    response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: templates.generateIdeas('AI-powered web applications', 3) }
      ],
    });
    console.log(response.choices[0].message.content);
    console.log('\n💡 Templates make prompts reusable and consistent!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

promptTemplates();

