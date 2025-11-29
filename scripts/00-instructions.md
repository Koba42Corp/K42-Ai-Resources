# Scripts Instructions

This guide will help you set up and run the scripts in this folder safely and effectively, whether you're a beginner or an experienced developer.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Variables Explained](#environment-variables-explained)
- [Securing Your API Key](#securing-your-api-key)
- [Running Scripts](#running-scripts)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Prerequisites

Before you begin, make sure you have:

1. **Node.js** installed (version 14 or higher)
   - Check if installed: `node --version`
   - Download: [nodejs.org](https://nodejs.org/)

2. **npm** (Node Package Manager) - comes with Node.js
   - Check if installed: `npm --version`

3. **An OpenAI API Key**
   - Sign up at [platform.openai.com](https://platform.openai.com/)
   - Navigate to API Keys section
   - Create a new secret key
   - ⚠️ **Important**: Copy it immediately - you won't be able to see it again!

---

## Initial Setup

### Step 1: Install Dependencies

Navigate to the scripts directory and install the required packages:

```bash
cd scripts
npm install openai dotenv
```

This installs:
- **openai**: The official OpenAI Node.js library
- **dotenv**: Loads environment variables from a `.env` file

### Step 2: Create Your Environment File

Create a file named `.env` in the `scripts` directory:

```bash
touch .env
```

Or on Windows:
```cmd
type nul > .env
```

---

## Environment Variables Explained

### What Are Environment Variables?

Environment variables are key-value pairs that store configuration data outside your code. They're perfect for sensitive information like API keys, database passwords, and other secrets.

**Why use them?**
- ✅ Keep secrets out of your code
- ✅ Different configurations for development/production
- ✅ Easy to change without modifying code
- ✅ Prevent accidental exposure in version control

### How They Work in These Scripts

Each script uses `require('dotenv').config()` at the top, which:
1. Reads the `.env` file
2. Loads variables into `process.env`
3. Makes them available as `process.env.VARIABLE_NAME`

Example:
```javascript
// In your .env file:
OPENAI_API_KEY=sk-1234567890abcdef

// In your script:
const apiKey = process.env.OPENAI_API_KEY; // "sk-1234567890abcdef"
```

---

## Securing Your API Key

### Why Security Matters

Your OpenAI API key is like a credit card for AI services:
- 🔴 **Anyone with your key can use your account**
- 🔴 **You'll be charged for their usage**
- 🔴 **Exposed keys can be found by bots in seconds**
- 🔴 **Once exposed, you must regenerate the key**

### Step 1: Add Your API Key to `.env`

Open the `.env` file you created and add your API key:

```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important Notes:**
- No spaces around the `=` sign
- No quotes needed (unless the value contains spaces)
- One variable per line
- Never share this file!

### Step 2: Protect Your `.env` File

#### Add `.env` to `.gitignore`

Create or edit a `.gitignore` file in the `scripts` directory:

```bash
echo ".env" >> .gitignore
```

Or manually add this line to `.gitignore`:
```
.env
```

This prevents Git from tracking your `.env` file, so it won't be committed to version control.

#### Verify `.env` is Ignored

```bash
git status
```

You should **NOT** see `.env` in the list of tracked files.

### Step 3: File Permissions (Advanced)

On Unix-based systems (Mac/Linux), restrict file permissions:

```bash
chmod 600 .env
```

This ensures only you can read/write the file.

### Step 4: Create a `.env.example` Template (Optional but Recommended)

Create a `.env.example` file that shows what variables are needed without exposing real values:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

This helps others know what to configure without seeing your actual key.

---

## Running Scripts

### Basic Execution

Run any script using Node.js:

```bash
node 01-basic-setup.js
```

Or:

```bash
node scripts/01-basic-setup.js
```

### Available Scripts

The scripts are numbered sequentially and build upon each other:

- `01-basic-setup.js` - Start here! Verifies your setup
- `02-simple-completion.js` - Basic text completion
- `03-chat-conversation.js` - Multi-turn conversations
- `04-system-prompt.js` - Using system prompts
- `05-error-handling.js` - Proper error handling
- `06-streaming-response.js` - Real-time streaming
- `07-text-generation.js` - Text generation examples
- `08-code-generation.js` - AI code generation
- ... and many more!

### Running Multiple Scripts

You can run scripts one at a time:

```bash
node 01-basic-setup.js
node 02-simple-completion.js
node 03-chat-conversation.js
```

### Using npm Scripts (Optional)

If you want to create shortcuts, add a `package.json`:

```json
{
  "name": "openai-scripts",
  "version": "1.0.0",
  "scripts": {
    "setup": "node 01-basic-setup.js",
    "completion": "node 02-simple-completion.js",
    "chat": "node 03-chat-conversation.js"
  }
}
```

Then run:
```bash
npm run setup
npm run completion
```

---

## Troubleshooting

### Error: "Cannot find module 'dotenv'"

**Solution**: Install dependencies
```bash
npm install openai dotenv
```

### Error: "OPENAI_API_KEY is not defined"

**Solutions**:
1. Check that `.env` file exists in the scripts directory
2. Verify the file contains: `OPENAI_API_KEY=sk-...`
3. Ensure no spaces around the `=` sign
4. Make sure you're running the script from the correct directory

### Error: "Invalid API Key"

**Solutions**:
1. Verify your API key is correct (starts with `sk-`)
2. Check for extra spaces or characters
3. Ensure you copied the full key
4. Try regenerating the key on OpenAI's platform

### Error: "Rate limit exceeded"

**Solution**: You've hit OpenAI's rate limits. Wait a few minutes and try again, or upgrade your plan.

### Script Runs But Shows No Output

**Solution**: Some scripts may have long-running operations. Wait a moment, or check the script's code to see what it's supposed to output.

---

## Best Practices

### 🔒 Security

1. **Never commit `.env` files**
   - Always add `.env` to `.gitignore`
   - Double-check before `git add` or `git commit`

2. **Don't share API keys**
   - Not in code comments
   - Not in screenshots
   - Not in chat messages
   - Not in public repositories

3. **Use different keys for different environments**
   - Development key for testing
   - Production key for live apps
   - Rotate keys periodically

4. **Monitor your usage**
   - Check OpenAI dashboard regularly
   - Set up usage alerts
   - Review unexpected charges

### 📝 Code Quality

1. **Start with script 01**
   - It verifies your setup
   - Run it first to catch issues early

2. **Read the comments**
   - Each script has documentation
   - Comments explain what's happening

3. **Experiment safely**
   - Modify scripts to learn
   - Keep backups of working versions
   - Test changes incrementally

4. **Understand the costs**
   - Each API call costs money
   - Different models have different prices
   - Monitor your usage dashboard

### 🚀 Productivity

1. **Use the right model**
   - `gpt-3.5-turbo` for most tasks (cheaper, faster)
   - `gpt-4` for complex reasoning (more expensive)
   - Check [OpenAI pricing](https://openai.com/pricing)

2. **Set appropriate limits**
   - Use `max_tokens` to control costs
   - Start with lower values and increase as needed

3. **Handle errors gracefully**
   - Script `05-error-handling.js` shows best practices
   - Always wrap API calls in try/catch

4. **Use streaming for long responses**
   - Script `06-streaming-response.js` demonstrates this
   - Better user experience for long outputs

---

## Quick Reference

### Essential Commands

```bash
# Install dependencies
npm install openai dotenv

# Create .env file
touch .env

# Add to .gitignore
echo ".env" >> .gitignore

# Run a script
node 01-basic-setup.js

# Check Node.js version
node --version

# Check npm version
npm --version
```

### .env File Format

```bash
# .env file contents
OPENAI_API_KEY=sk-your-key-here

# Optional: Add other variables
# MODEL_NAME=gpt-4
# MAX_TOKENS=1000
```

### Getting Help

- **OpenAI Documentation**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **OpenAI Community**: [community.openai.com](https://community.openai.com)
- **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/docs)

---

## Next Steps

1. ✅ Run `01-basic-setup.js` to verify everything works
2. 📖 Explore scripts in order to learn progressively
3. 🔧 Modify scripts to suit your needs
4. 🚀 Build your own AI-powered applications!

**Remember**: Security first, experiment second. Keep your API keys safe, and happy coding! 🎉

