let ig = require('instagram-node');
let providers = require('..\constants').providers;

module.exports = function (context, msg) {
    if (context.bindings.token.length) {
        let token = context.bindings.token[0].token;
        let client = ig.instagram();
        client.use({ access_token: token });
        client.media(msg.media_id, handleMedia);
    } else {
        context.log("user token not found");
        context.done();
    }

    function handleMedia(err, media) {
        if (media.tags.includes('hfm')) {
            let message = {
                social_site: providers.instagram,
                userid: msg.user_id,
                longitude: media.location.longitude,
                latitude: media.location.latitude,
                profileimageurl: media.user.profile_picture,
                photos: [],
                media_id: media.id,
                media_text: media.caption.text
            }

            context.log('added to store: ', media.id);
            context.bindings.out = message;
        } else {
            context.log('not #hfm: ', media.id);
        }
        context.done(err);
    }
};