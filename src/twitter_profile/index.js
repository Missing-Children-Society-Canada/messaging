var util = require('util');
var twitter = require('twitter');

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {

    return twit.get(`statuses/show/${message.twitter.username}`)
        .then(log)

    function setOutputBinding(data) {
        context.bindings.out = data;
        return data;
    }

    function log(data) {
        context.log(data);
        return data;
    }
}