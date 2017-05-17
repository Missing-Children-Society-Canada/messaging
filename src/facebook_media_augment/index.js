var request = require('request-promise');

module.exports = function (context, message) {

    let myPath = '/' + message.social.facebook.id + '?fields=id,picture,place,name,comments,reactions';

    let options = {
        uri: "https://graph.facebook.com" + myPath,
        method: 'GET',
        headers: {
            'Authorization': 'OAuth ' + message.social.facebook.token
        }
    };

    request(options)
        .then((response) => {
            let data = message;
            
            message.response = {
                platform: "facebook",
                type: "media",
                data: response
            };

            context.bindings.out = data;
        })
        .catch((error) => context.log(error))
        .finally(() => context.done());

}