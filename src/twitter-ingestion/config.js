var config = {}

//TWITTER CONFIG
config.ConsumerKey = process.env.TWITTER_CONSUMER_KEY;
config.ConsumerSecret = process.env.TWITTER_CONSUMER_SECRET;
config.AccessToken = process.env.TWITTER_ACCESS_TOKEN;
config.AccessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
config.HashTag = process.env.HASH_TAG;

module.exports = config;