var config = {}

//TWITTER CONFIG
config.ConsumerKey = process.env.TWITTER_CONSUMER_KEY || 'XXXXXXXXXXXXXXXX';
config.ConsumerSecret = process.env.TWITTER_CONSUMER_SECRET || 'XXXXXXXXXXXXXXXX';
config.AccessToken = process.env.TWITTER_ACCESS_TOKEN || 'XXXXXXXXXXXXXXXX';
config.AccessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET || 'XXXXXXXXXXXXXXXX';
config.HashTag = process.env.HASH_TAG || 'helpmeplease';

module.exports = config;