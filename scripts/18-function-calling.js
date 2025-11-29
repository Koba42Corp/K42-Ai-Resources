/**
 * 18 - Function Calling (Tools)
 * 
 * This script demonstrates OpenAI's function calling feature,
 * allowing AI to call your custom functions.
 * 
 * Use cases:
 * - API integrations
 * - Database queries
 * - External tool usage
 * - Dynamic behavior
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define functions that AI can call
const functions = {
  getWeather: (location) => {
    // Simulated weather data
    const weatherData = {
      'New York': { temp: 72, condition: 'Sunny' },
      'London': { temp: 55, condition: 'Cloudy' },
      'Tokyo': { temp: 68, condition: 'Rainy' }
    };
    return weatherData[location] || { temp: 65, condition: 'Unknown' };
  },

  calculate: (expression) => {
    try {
      // Simple calculator (in production, use a proper math parser)
      return eval(expression);
    } catch (error) {
      return 'Error: Invalid expression';
    }
  }
};

async function functionCalling() {
  try {
    console.log('🔧 Function calling example...\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'What is the weather in New York and calculate 15 * 23?'
        }
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'getWeather',
            description: 'Get the current weather for a location',
            parameters: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'The city name'
                }
              },
              required: ['location']
            }
          }
        },
        {
          type: 'function',
          function: {
            name: 'calculate',
            description: 'Calculate a mathematical expression',
            parameters: {
              type: 'object',
              properties: {
                expression: {
                  type: 'string',
                  description: 'Mathematical expression to evaluate'
                }
              },
              required: ['expression']
            }
          }
        }
      ],
      tool_choice: 'auto',
    });

    const message = response.choices[0].message;

    // Check if AI wants to call functions
    if (message.tool_calls) {
      console.log('🤖 AI requested function calls:\n');
      
      const toolResults = [];
      
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        
        console.log(`📞 Calling: ${functionName}(${JSON.stringify(args)})`);
        
        let result;
        if (functionName === 'getWeather') {
          result = functions.getWeather(args.location);
        } else if (functionName === 'calculate') {
          result = functions.calculate(args.expression);
        }
        
        toolResults.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: JSON.stringify(result)
        });
      }

      // Send results back to AI
      const finalResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: 'What is the weather in New York and calculate 15 * 23?' },
          message,
          ...toolResults
        ],
      });

      console.log('\n✅ Final response:');
      console.log(finalResponse.choices[0].message.content);
    } else {
      console.log('📝 Response:', message.content);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

functionCalling();

