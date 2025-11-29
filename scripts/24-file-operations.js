/**
 * 24 - File Operations with AI
 * 
 * This script demonstrates how to read files, process them
 * with AI, and write results back.
 * 
 * Use cases:
 * - Document processing
 * - Batch file analysis
 * - Content extraction
 * - File transformation
 */

require('dotenv').config();
const { OpenAI } = require('openai');
const fs = require('fs').promises;
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fileOperations() {
  try {
    console.log('📁 File operations with AI...\n');

    // Create a sample file
    const sampleContent = `
      JavaScript is a versatile programming language used for web development.
      It supports both object-oriented and functional programming paradigms.
      Modern JavaScript includes features like async/await, arrow functions, and modules.
      Node.js allows JavaScript to run on the server-side as well.
    `;

    const inputFile = path.join(__dirname, 'sample_input.txt');
    await fs.writeFile(inputFile, sampleContent);
    console.log('✅ Created sample file: sample_input.txt\n');

    // Read and process file
    console.log('📖 Reading file...');
    const fileContent = await fs.readFile(inputFile, 'utf-8');
    console.log('📝 Original content:', fileContent.substring(0, 100) + '...\n');

    // Process with AI
    console.log('🤖 Processing with AI...');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Summarize this text in bullet points:\n\n${fileContent}`
        }
      ],
    });

    const summary = response.choices[0].message.content;
    console.log('📊 Summary:', summary);
    console.log('');

    // Write result to new file
    const outputFile = path.join(__dirname, 'sample_output.txt');
    await fs.writeFile(outputFile, summary);
    console.log('✅ Saved summary to: sample_output.txt');

    // Cleanup
    await fs.unlink(inputFile);
    await fs.unlink(outputFile);
    console.log('🧹 Cleaned up temporary files');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fileOperations();

