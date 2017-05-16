let ig = require('instagram-node');

module.exports = function (context, message) {
    let client = ig.instagram();

    client.use({ access_token: message.social.instagram.token });

    client.media(message.mediaid, function (err, media) {
        let data = message;
        
        data.response = {
            platform: "instagram",
            type: "media",
            data: media
        };

        context.bindings.out = data;

        context.done(err);
    });
};