/**
 * 37 - Logging and Monitoring
 * 
 * This script demonstrates how to add logging and monitoring
 * to AI API calls for debugging and analytics.
 * 
 * Essential for production applications!
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple logger
class Logger {
  constructor(level = 'INFO') {
    this.level = level;
    this.logs = [];
  }

  log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...data
    };

    this.logs.push(logEntry);

    // In production, send to logging service
    console.log(`[${timestamp}] [${level}] ${message}`, data);
  }

  info(message, data) {
    this.log('INFO', message, data);
  }

  error(message, data) {
    this.log('ERROR', message, data);
  }

  warn(message, data) {
    this.log('WARN', message, data);
  }

  getLogs() {
    return this.logs;
  }
}

// AI client with logging
class MonitoredAIClient {
  constructor(logger) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.logger = logger;
  }

  async chat(messages, options = {}) {
    const startTime = Date.now();
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.logger.info('AI request started', {
      requestId,
      model: options.model || 'gpt-3.5-turbo',
      messageCount: messages.length
    });

    try {
      const response = await this.openai.chat.completions.create({
        model: options.model || 'gpt-3.5-turbo',
        messages,
        ...options
      });

      const duration = Date.now() - startTime;

      this.logger.info('AI request completed', {
        requestId,
        duration: `${duration}ms`,
        tokens: response.usage.total_tokens,
        cost: this.estimateCost(response.usage.total_tokens, options.model || 'gpt-3.5-turbo')
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error('AI request failed', {
        requestId,
        duration: `${duration}ms`,
        error: error.message,
        status: error.status
      });
      throw error;
    }
  }

  estimateCost(tokens, model) {
    // Simplified cost estimation (check OpenAI pricing for accurate rates)
    const costPer1kTokens = model.includes('gpt-4') ? 0.03 : 0.002;
    return `$${((tokens / 1000) * costPer1kTokens).toFixed(4)}`;
  }
}

async function loggingMonitoring() {
  try {
    console.log('📊 Logging and monitoring example...\n');

    const logger = new Logger();
    const aiClient = new MonitoredAIClient(logger);

    await aiClient.chat([
      { role: 'user', content: 'Explain async/await in one sentence.' }
    ]);

    console.log('\n📋 Log History:');
    logger.getLogs().forEach(log => {
      console.log(JSON.stringify(log, null, 2));
    });

    console.log('\n💡 In production, send logs to services like Datadog, Sentry, or CloudWatch!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

loggingMonitoring();

