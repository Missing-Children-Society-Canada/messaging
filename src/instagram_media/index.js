let ig = require('instagram-node');

module.exports = function (context, message) {
    let token = message.instagram.token;
    let client = ig.instagram();
    client.use({ access_token: token });
    client.media(message.mediaid, handleMedia);

    function handleMedia(err, media) {
        if (media.tags.includes('hfm')) {
            let message = {
                plaftorm: 'instagram',
                userid: msg.user_id,
                longitude: media.location.longitude,
                latitude: media.location.latitude,
                profileimageurl: media.user.profile_picture,
                photos: [],
                media_id: media.id,
                media_text: media.caption.text
            }

            context.bindings.out = message;
        } else {
            context.log('not #hfm: ', media.id);
        }

        context.done(err);
    }
};