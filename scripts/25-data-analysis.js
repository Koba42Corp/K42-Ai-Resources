/**
 * 25 - Data Analysis with AI
 * 
 * This script demonstrates how to use AI to analyze data,
 * generate insights, and create reports.
 * 
 * Use cases:
 * - Business intelligence
 * - Data interpretation
 * - Report generation
 * - Trend analysis
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function dataAnalysis() {
  try {
    console.log('📊 Data analysis with AI...\n');

    // Sample sales data
    const salesData = {
      'Q1 2024': { revenue: 125000, units: 500, growth: 15 },
      'Q2 2024': { revenue: 145000, units: 580, growth: 16 },
      'Q3 2024': { revenue: 168000, units: 672, growth: 16 },
      'Q4 2024': { revenue: 195000, units: 780, growth: 16 }
    };

    const dataString = JSON.stringify(salesData, null, 2);

    console.log('📈 Sales Data:');
    console.log(dataString);
    console.log('\n⏳ Analyzing data...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a data analyst. Analyze the provided data and provide insights, trends, and recommendations.'
        },
        {
          role: 'user',
          content: `Analyze this sales data and provide:\n1. Key trends\n2. Notable patterns\n3. Recommendations for next quarter\n\nData:\n${dataString}`
        }
      ],
      temperature: 0.3,
    });

    console.log('📊 Analysis Results:');
    console.log(response.choices[0].message.content);
    console.log('\n✅ Data analysis complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

dataAnalysis();

