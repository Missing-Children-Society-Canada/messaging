var util = require('util');
var twitter = require('twitter');

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {

    context.log(message);
    context.log(message.twitter.id);

    return twit.get(`users/show.json?user_id=${message.twitter.id}`, { include_entities: true })
        .then(log)
        .then(setOutputBinding)

    function setOutputBinding(data) {
        context.bindings.out = data;
        return data;
    }

    function log(data) {
        context.log(data);
        return data;
    }
}