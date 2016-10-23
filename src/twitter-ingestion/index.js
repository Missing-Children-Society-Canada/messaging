var Twitter = require('./twitter');
var config = {}

//TWITTER CONFIG
config.ConsumerKey = 'q2JfZwE8BTIHHNruzRqaWubEI';
config.ConsumerSecret = 'FI4nM1BuayKsMBLZ2fA4zicaOkNUvjrhfRgiDYngVQVBtkXRyT';
config.AccessToken = '242907489-B4Xul8Rik2fzwnLrhim6pQEElnLZYLNMHXAeuDn3';
config.AccessTokenSecret = 'KAQjh2M9I2Pf6BUrwoF4QsYrb0wXO696UlmGeOscMLrGj';
config.HashTag = 'test';

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
    
    stream.on('tweet', function (tweet) {
        var data = {
            content: tweet,
            type: 1
        };
        
        context.done(null, data);
    });
};