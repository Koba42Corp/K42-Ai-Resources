/**
 * 47 - Multi-Language Support
 * 
 * This script demonstrates building applications that
 * support multiple languages using AI translation.
 * 
 * Use cases:
 * - Internationalization
 * - Localization
 * - Multi-language apps
 * - Content translation
 */

require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class MultiLanguageSupport {
  constructor(defaultLanguage = 'en') {
    this.defaultLanguage = defaultLanguage;
    this.translations = new Map();
  }

  async translate(text, targetLanguage) {
    const cacheKey = `${text}_${targetLanguage}`;
    
    if (this.translations.has(cacheKey)) {
      return this.translations.get(cacheKey);
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate accurately and naturally.`
        },
        {
          role: 'user',
          content: `Translate this text to ${targetLanguage}:\n\n"${text}"`
        }
      ],
      temperature: 0.3,
    });

    const translation = response.choices[0].message.content;
    this.translations.set(cacheKey, translation);
    return translation;
  }

  async translateBatch(texts, targetLanguage) {
    const translations = await Promise.all(
      texts.map(text => this.translate(text, targetLanguage))
    );
    return translations;
  }
}

async function multiLanguageSupport() {
  try {
    console.log('🌍 Multi-language support example...\n');

    const i18n = new MultiLanguageSupport();

    const uiTexts = [
      'Welcome to our application',
      'Click here to continue',
      'Error: Please try again',
      'Success! Your request was processed.'
    ];

    const languages = ['Spanish', 'French', 'German'];

    for (const lang of languages) {
      console.log(`\n📝 Translating to ${lang}:`);
      const translations = await i18n.translateBatch(uiTexts, lang);
      
      translations.forEach((translation, index) => {
        console.log(`  ${index + 1}. ${uiTexts[index]}`);
        console.log(`     → ${translation}`);
      });
    }

    console.log('\n✅ Multi-language support implemented!');
    console.log('💡 Use this pattern for international applications!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

multiLanguageSupport();

