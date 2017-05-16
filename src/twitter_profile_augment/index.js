var twitter = require('twitter');

const twit = new twitter({
    consumer_key: process.env.TwitterConsumerKey,
    consumer_secret: process.env.TwitterConsumerSecret,
    access_token_key: process.env.TwitterAccessTokenKey,
    access_token_secret: process.env.TwitterAccessTokenSecret
});

module.exports = function (context, message) {
    return twit.get('users/show.json', { user_id: message.social.twitter.id }, function (err, user) {
        let data = message;

        data.response = {
            platform: "twitter",
            type: "profile",
            data: user
        };

        context.bindings.out = data;
        
        context.done(err);
    });
}