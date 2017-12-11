const mongojs = require('mongojs');

const db = {
    scraper: mongojs("redditScraper", ["scraper"])
};

modules.exports = db;