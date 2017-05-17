var azure = require('azure-sb');

module.exports = function (context, inmessage) {
    let err = null;

    //configure sb client
    var serviceBusService = azure.createServiceBusService(process.env.AzureWebJobsServiceBus);
    var topic = "toaugment";

    //build outgoing message
    let outmessage = {
        user: inmessage.user,
        request: inmessage.request,
        id: inmessage.id
    };

    outmessage.social = {};

    if (inmessage.user.twitter != undefined) {
        outmessage.social.twitter = {
            id: inmessage.user.twitter.$id,
            token: inmessage.user.twitter.token,
            username: inmessage.user.twitter.username,
        };
    }

    if (inmessage.user.facebook != undefined) {
        outmessage.social.facebook = {
            id: inmessage.user.facebook.$id,
            token: inmessage.user.facebook.token,
            username: inmessage.user.facebook.email
        };
    }
    if (inmessage.user.instagram != undefined) {
        outmessage.social.instagram = {
            id: inmessage.user.instagram.$id,
            token: inmessage.user.instagram.token,
            username: inmessage.user.instagram.username
        };
    }

    var brokeredMessage = {
        body: 'hello',
        customProperties: {
            hastwitter: inmessage.user.twitter != undefined,
            hasfacebook: inmessage.user.facebook != undefined,
            hasinstagram: inmessage.user.instagram != undefined,
            platform: inmessage.request.platform
        }
    }   
 //   brokeredMessage.customProperties.platform = inmessage.request.platform;


    //send message
    serviceBusService.sendTopicMessage(topic, brokeredMessage, function (error) {
        if (error) {
            context.log(error);
        }
    });
    
    context.done(err);
}