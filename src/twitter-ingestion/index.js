var Twitter = require('./twitter');
var config = {}

//TWITTER CONFIG
config.ConsumerKey = GetEnvironmentVariable('TWITTER_CONSUMER_KEY');
config.ConsumerSecret = GetEnvironmentVariable('TWITTER_CONSUMER_SECRET');
config.AccessToken = GetEnvironmentVariable('TWITTER_ACCESS_TOKEN');
config.AccessTokenSecret = GetEnvironmentVariable('TWITTER_ACCESS_TOKEN_SECRET');
config.HashTag = GetEnvironmentVariable('HASH_TAG');

var twitterClient = new Twitter({
    consumer_key: config.ConsumerKey,
    consumer_secret: config.ConsumerSecret,
    access_token: config.AccessToken,
    access_token_secret: config.AccessTokenSecret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

var stream = twitterClient.stream('statuses/filter', {
    track: [config.HashTag]
});

module.exports = function (context) {

context.log(config);

    stream.on('tweet', function (tweet) {
        context.bindings.ingestion = {
            content: tweet,
            type: 1
        };
    });
};