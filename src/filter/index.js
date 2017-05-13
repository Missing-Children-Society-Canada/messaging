module.exports = function (context, message) {

    var err = null;

    var userdata = context.bindings.userdata[0];
    context.log(userdata);//TEMP LOGGING

    if (!userdata.twitter && !userdata.facebook || !userdata.instagram) {
        console.log('No social profiles');

        err = new Error('No social profiles');
    }

    if (!userdata.id) {
        console.log('No user id');

        err = new Error('No social profiles');
    }

    var data = {
        userid = message.userid
    };

    if (message.twitter) {
        console.log('adding twitter');

        data.twitter = {
            id: message.twitter.$id,
            token: message.twitter.token,
            username: message.twitter.username,
        };
    }

    if (message.instagram) {
        console.log('adding instagram');

        data.instagram = {
            id: message.instagram.$id,
            token: message.instagram.token,
            username: message.instagram.username,
        };
    }

    if (message.facebook) {
        console.log('adding facebook');

        data.facebook = {
            id: message.facebook.$id,
            token: message.facebook.token,
            username: message.facebook.email,
        };
    }

    context.done(err, data);
};