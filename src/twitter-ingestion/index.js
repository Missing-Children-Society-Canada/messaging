var twitterClient = require('./twitter');
var config = require('./config');

var T = new twitterClient({
    consumer_key: config.ConsumerKey,
    consumer_secret: config.ConsumerSecret,
    access_token: config.AccessToken,
    access_token_secret: config.AccessTokenSecret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

module.exports = function (context) {

    var stream = T.stream('statuses/filter', {
        track: [config.HashTag]
    })

    stream.on('tweet', function (tweet) {
        context.bindings.myOutput = {
            content: tweet,
            type: 1
        };
    });
};