var twitter = require('twitter');

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {
    let params = {
        user_id: message.twitter.id
    };

    return twit.get('users/show.json', params, function(err, user) {
        context.done(err, user);
    });
}