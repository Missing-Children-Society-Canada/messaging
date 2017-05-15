var twitter = require('twitter');

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {

    context.log('A: ' + process.env.TwitterConsumerKey);
    context.log('B: ' + process.env.TwitterConsumerSecret);
    context.log('C: ' + process.env.TwitterAccessTokenKey);
    context.log('D: ' + process.env.TwitterAccessTokenSecret);
    context.log(message.twitter.id);

    return twit.get(`users/show.json?user_id=${message.twitter.id}`)   
        .then(setOutputBinding)

    function setOutputBinding(message) {
        context.bindings.out = message;
        return message;
    }
}