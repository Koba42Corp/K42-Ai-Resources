/**
 * 44 - Testing Patterns for AI
 * 
 * This script demonstrates testing patterns for AI applications,
 * including mocking and validation strategies.
 * 
 * Essential for reliable applications!
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock AI client for testing
class MockAIClient {
  constructor() {
    this.responses = new Map();
  }

  setResponse(prompt, response) {
    this.responses.set(prompt.toLowerCase(), response);
  }

  async chat(messages) {
    const prompt = messages.find(m => m.role === 'user')?.content || '';
    const mockResponse = this.responses.get(prompt.toLowerCase());
    
    if (mockResponse) {
      return {
        choices: [{
          message: {
            content: mockResponse
          }
        }],
        usage: {
          total_tokens: 50,
          prompt_tokens: 20,
          completion_tokens: 30
        }
      };
    }

    // Fallback to real API if not mocked
    return await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 50,
    });
  }
}

// Test suite
class AITestSuite {
  constructor() {
    this.tests = [];
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Running AI tests...\n');
    
    let passed = 0;
    let failed = 0;

    for (const test of this.tests) {
      try {
        await test.fn();
        console.log(`✅ ${test.name}`);
        passed++;
      } catch (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        failed++;
      }
    }

    console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
    return { passed, failed };
  }
}

async function testingPatterns() {
  try {
    console.log('🧪 Testing patterns for AI...\n');

    const mockClient = new MockAIClient();
    const testSuite = new AITestSuite();

    // Setup mock responses
    mockClient.setResponse('hello', 'Hi there!');
    mockClient.setResponse('test', 'This is a test response');

    // Test 1: Mock response
    testSuite.test('Mock response works', async () => {
      const response = await mockClient.chat([
        { role: 'user', content: 'hello' }
      ]);
      if (!response.choices[0].message.content.includes('Hi there')) {
        throw new Error('Mock response not working');
      }
    });

    // Test 2: Response format
    testSuite.test('Response has correct structure', async () => {
      const response = await mockClient.chat([
        { role: 'user', content: 'test' }
      ]);
      if (!response.choices || !response.choices[0] || !response.choices[0].message) {
        throw new Error('Invalid response structure');
      }
    });

    // Test 3: Token usage tracking
    testSuite.test('Token usage is tracked', async () => {
      const response = await mockClient.chat([
        { role: 'user', content: 'test' }
      ]);
      if (!response.usage || !response.usage.total_tokens) {
        throw new Error('Token usage not tracked');
      }
    });

    await testSuite.run();

    console.log('\n💡 Use mocks and tests to ensure reliable AI applications!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testingPatterns();

