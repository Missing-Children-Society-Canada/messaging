let ig = require('instagram-node');

module.exports = function (context, message) {
    let token = message.instagram.token;
    let client = ig.instagram();

    client.use({ access_token: token });

    client.media(message.mediaid, function (err, media) {

        context.bindings.out = media;

        context.done(err);
    });
};