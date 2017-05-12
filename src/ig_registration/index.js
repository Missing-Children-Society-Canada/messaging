let request = require('request');

module.exports = function (context, req) {
    var user_id = req.query.user_id;
    if (user_id) {
        request.post("https://api.instagram.com/v1/subscriptions/", {
            form: {
                client_id: process.env.IG_CLIENT_ID,
                client_secret: process.env.IG_CLIENT_SECRET,
                object: "user",
                aspect: "media",
                verify_token: process.env.IG_VERIFY_TOKEN,
                callback_url: `https://${process.env.WEBSITE_SITE_NAME}.azurewebsites.net/api/ig_subscriptions`
            }
        }, (err, response) => context.done(err));
    } else {
        context.done();
    }
};