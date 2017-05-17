const azure = require('azure-sb');
const topic = "toaugment";

module.exports = function (context, inmessage) {

    let customProperties = {
        hastwitter: inmessage.user.twitter != undefined,
        hasfacebook: inmessage.user.facebook != undefined,
        hasinstagram: inmessage.user.instagram != undefined,
        platform: inmessage.request.platform
    };

    let outmessage = inmessage;

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
        body: JSON.stringify(outmessage),
        customProperties: {
            hastwitter: inmessage.user.twitter != undefined,
            hasfacebook: inmessage.user.facebook != undefined,
            hasinstagram: inmessage.user.instagram != undefined,
            platform: inmessage.request.platform
        }
    }

    let serviceBusService = azure.createServiceBusService(process.env.AzureWebJobsServiceBus);
    serviceBusService.sendTopicMessage(topic, brokeredMessage, function (error) {
        context.done(error);
    });
}