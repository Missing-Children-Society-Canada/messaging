var util = require('util');
var twitter = require('twitter');

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {

    context.log(message.twitter.id);
    context.log(message.twitter.token);

    return twit.get(`users/show.json?user_id=${message.twitter.id}`)
        .then(logData)
        .then(setOutputBinding)

    function setOutputBinding(message) {
        context.bindings.out = message;
        return message;
    }

    function logData(message) {
        context.log(message);
        return message;
    }
}