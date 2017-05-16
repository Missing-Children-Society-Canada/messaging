var request = require('request-promise');

module.exports = function (context, message) {

    let path = '/' + message.social.facebook.id + '?fields=email,first_name,last_name,birthday,locale,location,picture.width(500),about,education,friends,hometown,photos,relationship_status,religion,political,tagged_places,work,posts';

    let options = {
        uri: "https://graph.facebook.com" + path,
        method: 'GET',
        headers: {
            'Authorization': 'OAuth ' + message.social.facebook.token
        }
    };

    request(options)
        .then((response) => {
            let data = message;

            data.response = {
                platform: "facebook",
                type: "profile",
                data: response
            };

            context.bindings.out = data;
        })
        .catch((error) => context.log(error))
        .finally(() => context.done());
}