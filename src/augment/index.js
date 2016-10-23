var util = require('util');
var twitter = require('twitter');

var twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.ConsumerSecret,
    access_token_key: process.env.AccessTokenKey,
    access_token_secret: process.env.AccessTokenSecret
});

module.exports = function (context, message) {
    var rest = 'statuses/show/' + message.tweetid;
    context.log(message.tweetid);
    twit.get(rest, { include_entities: true }, function (error, tweets, response) {
        if (tweets.coordinates != null && 2 <= tweets.coordinates.coordinates.length) {
            message.latitude = tweets.coordinates.coordinates[0];
            message.longitude = tweets.coordinates.coordinates[1];

            context.log('Lat: ' + message.latitude + ' Long:' + message.longitude);
        }
    });

    //Pull in X # of Photos from Twitter
    message.photos = [];

    context.bindings.out = message;
    context.done();
};