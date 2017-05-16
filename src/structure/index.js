var azure = require('azure-sb');

module.exports = function (context, inmessage) {
    let err = null;

    //configure sb client
    var serviceBusService = azure.createServiceBusService(process.env.AzureWebJobsServiceBus);
    var topic = "toaugment";

    //build outgoing message
    let outmessage = inmessage;
    outmessage.customProperties = {
        istwitter: false,
        isfacebook: false,
        isinstagram: false,
        platform: inmessage.platform
    };

    outmessage.social = {};

    if (inmessage.user.twitter != undefined) {
        outmessage.customProperties.istwitter = true;
        outmessage.social.twitter = {
            id: inmessage.user.twitter.$id,
            token: inmessage.user.twitter.token,
            username: inmessage.user.twitter.username,
        };
    }

    if (inmessage.user.facebook != undefined) {
        outmessage.customProperties.isfacebook = true;
        outmessage.social.facebook = {
            id: inmessage.user.facebook.$id,
            token: inmessage.user.facebook.token,
            username: inmessage.user.facebook.email
        };
    }
    if (inmessage.user.instagram != undefined) {
        outmessage.customProperties.isinstagram = true;
        outmessage.social.instagram = {
            id: inmessage.user.instagram.$id,
            token: inmessage.user.instagram.token,
            username: inmessage.user.instagram.username
        };
    }

    //send message
    serviceBusService.sendTopicMessage(topic, JSON.stringify(outmessage), function (error) {
        if (error) {
            context.log(error);
        }
    });
    
    context.done(err);
};