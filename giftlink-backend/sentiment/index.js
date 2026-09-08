// sentiment/index.js
const natural = require('natural');

// Natural sentiment analyzer
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

function getSentiment(text) {
    if (!text || typeof text !== 'string') {
        return 'neutral';
    }

    const tokenizer = new natural.WordTokenizer();
    const tokenizedWords = tokenizer.tokenize(text);

    if (!tokenizedWords || tokenizedWords.length === 0) {
        return 'neutral';
    }

    const score = analyzer.getSentiment(tokenizedWords);

    if (score > 0.33) {
        return 'positive';
    } else if (score < -0.33) {
        return 'negative';
    } else {
        return 'neutral';
    }
}

module.exports = {
    getSentiment
};
