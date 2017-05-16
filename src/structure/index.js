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
    let customProperties = {
        istwitter: false,
        isfacebook: false,
        isinstagram: false,
        platform: inmessage.platform
    };

    outmessage.social = {};

    if (inmessage.user.twitter != undefined) {
        customProperties.istwitter = true;
        outmessage.social.twitter = {
            id: inmessage.user.twitter.$id,
            token: inmessage.user.twitter.token,
            username: inmessage.user.twitter.username,
        };
    }

    if (inmessage.user.facebook != undefined) {
        customProperties.isfacebook = true;
        outmessage.social.facebook = {
            id: inmessage.user.facebook.$id,
            token: inmessage.user.facebook.token,
            username: inmessage.user.facebook.email
        };
    }
    if (inmessage.user.instagram != undefined) {
        customProperties.isinstagram = true;
        outmessage.social.instagram = {
            id: inmessage.user.instagram.$id,
            token: inmessage.user.instagram.token,
            username: inmessage.user.instagram.username
        };
    }

    let brokeredMessage = {
        customProperties: customProperties,
        body: outmessage
    }

    //send message
    serviceBusService.sendTopicMessage(topic, brokeredMessage, function (error) {
        if (error) {
            context.log(error);
        }
    });

    
    context.done(err);
};