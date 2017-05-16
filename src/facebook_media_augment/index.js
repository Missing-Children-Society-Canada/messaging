var request = require('request-promise');

module.exports = function (context, message) {

    // connect to facebook graph
    let myPath = '/' + message.request.facebook.id + '?fields=album,event,id,height,picture,place,name,images,comments,name_tags,reactions';

    let options = {
        uri: "https://graph.facebook.com" + myPath,
        method: 'GET',
        headers: {
            'Authorization': 'OAuth ' + message.request.facebook.token
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