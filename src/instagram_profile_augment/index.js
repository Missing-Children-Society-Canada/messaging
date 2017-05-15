let ig = require('instagram-node');

module.exports = function (context, message) {

    context.log(message.instagram.token);

    let client = ig.instagram();
    client.use({ access_token: message.instagram.token });

    ig.user(message.instagram.id, function (err, result) {
        context.bindings.out = result;

        context.done(err);
    });
}