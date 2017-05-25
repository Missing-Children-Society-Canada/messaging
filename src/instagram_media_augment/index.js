let ig = require('instagram-node');

module.exports = function (context, message) {
    let client = ig.instagram();

    client.use({ access_token: message.social.instagram.token });

    client.media(message.request.mediaid, function (err, result) {
        let data = message;

        data.response = {
            platform: "instagram",
            type: "media",
            data: result
        };

        context.bindings.out = data;

        context.done(err);
    });
};