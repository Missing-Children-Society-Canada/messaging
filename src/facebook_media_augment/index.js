var request = require('request-promise');

module.exports = function (context, message) {

    let path = '/' + message.social.facebook.id + '?fields=id,picture,place,name,comments,reactions';

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
                type: "media",
                data: JSON.parse(response)
            };

            context.bindings.out = data;
        })
        .catch((error) => context.log(error))
        .finally(() => context.done());
}