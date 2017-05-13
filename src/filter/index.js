module.exports = function (context, message, userdata) {

    let err = null;

    context.log(userdata);//TEMP LOGGING

    if (!userdata) {
        console.log('Not tracking user');

        err = new Error('Not tracking user');
    }

    if (!userdata.twitter && !userdata.facebook || !userdata.instagram) {
        console.log('No social profiles');

        err = new Error('No social profiles');
    }

    if (!userdata.id) {
        console.log('No user id');

        err = new Error('No social profiles');
    }

    let data = null;

    // if (!err) {
    //     data = {
    //         userid = userdata.id,
    //         platform = message.platform,
    //         mediaid = message.mediaid
    //     };

    //     if (message.twitter) {
    //         console.log('adding twitter');

    //         data.twitter = {
    //             id: message.twitter.$id,
    //             token: message.twitter.token,
    //             username: message.twitter.username,
    //         };
    //     }

    //     if (message.instagram) {
    //         console.log('adding instagram');

    //         data.instagram = {
    //             id: message.instagram.$id,
    //             token: message.instagram.token,
    //             username: message.instagram.username,
    //         };
    //     }

    //     if (message.facebook) {
    //         console.log('adding facebook');

    //         data.facebook = {
    //             id: message.facebook.$id,
    //             token: message.facebook.token,
    //             username: message.facebook.email,
    //         };
    //     }
    // }

    context.done(err, data);
};