var request = require('request-promise');

module.exports = function (context, inMsg) {

    // log the message for debugging
    context.log('UserId: ',inMsg.fb_user_id);

    // connect to facebook graph
    var myPath = '/' + inMsg.fb_user_id + '?fields=email,first_name,last_name,birthday,locale,location,picture.width(500),about,education,friends,hometown,photos,relationship_status,religion,political,tagged_places,work';
    
    var options = {
        uri: "https://graph.facebook.com" + myPath,
        method: 'GET',
        headers: {
            'Authorization': 'OAuth ' + inMsg.fb_access_token
        }
    };    

    request(options)
        .then((response) => {

            context.log("From FB:", response);
            context.bindings.outMsg = response;

        })
        .catch((error) => context.log(error))
        .finally(() => context.done());

}