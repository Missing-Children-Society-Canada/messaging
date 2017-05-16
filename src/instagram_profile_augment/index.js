let ig = require('instagram-node');

module.exports = function (context, message) {
    let client = ig.instagram();
    client.use({ access_token: message.social.instagram.token });

    client.user(message.social.instagram.id, function (err, result) {
        let data = message;
        
        data.response = {
            platform: "instagram",
            type: "profile",
            data: result
        };

        context.bindings.out = data;

        context.done(err);
    });
}