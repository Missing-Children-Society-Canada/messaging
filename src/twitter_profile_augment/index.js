var util = require('util');
var twitter = require('twitter');

module.exports = function (context, message) {

    context.log(message.twitter.id);
    context.log(message.twitter.token);

    const twit = new twitter({
        consumer_key: process.env.TwitterConsumerKey,
        consumer_secret: process.env.TwitterConsumerSecret,
        bearer_token: message.twitter.token
    });

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