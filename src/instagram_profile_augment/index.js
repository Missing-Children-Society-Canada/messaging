let ig = require('instagram-node');

module.exports = function (context, req) {
    let token = message.instagram.token;
    let client = ig.instagram();
    client.use({ access_token: token });

    client.media(message.mediaid, handleMedia); //USED FOR FILTERING; Would be better upstream???

    function handleMedia(err, media) {
        if (media.tags.includes('hfm')) {
            ig.user('user_id', handleProfile);
        } else {
            context.log('not #hfm: ', media.id);
        }
    }

    function handleProfile(err, result) {
        let data = result;

        context.bindings.out = data;
        //Format Data

        context.done(err);
    }
}