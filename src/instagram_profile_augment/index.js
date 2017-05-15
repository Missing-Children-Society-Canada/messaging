let ig = require('instagram-node');

module.exports = function (context, message) {
    
    context.log(message.instagram.token);

    let client = ig.instagram();
    client.use({ access_token: message.instagram.token });

    client.media(message.mediaid, handleMedia); //USED FOR FILTERING; Would be better upstream???

    function handleMedia(err, media) {
        if (media.tags.includes('hfm')) {
            ig.user('user_id', handleProfile);
        } else {
            context.log('not #hfm: ', media.id);
        }
    }

    function handleProfile(err, result) {
        context.bindings.out = result;

        context.done(err);
    }
}