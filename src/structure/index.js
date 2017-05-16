var azure = require('azure-sb');

module.exports = function (context, inmessage) {
    let err = null;

    //configure sb client
    var retryOperations = new azure.ExponentialRetryPolicyFilter();
    var serviceBusService = azure.createServiceBusService(process.env.AzureWebJobsServiceBus).withFilter(retryOperations);
    var topic = "toaugment";

    //build outgoing message
    var outmessage = {
        body: '',
        id: 0,
        user: "",
        customProperties: {
            istwitter: false,
            isfacebook: false,
            isinstagram: false
        },
        social: {}
    }

    outmessage.id = inmessage.id;

    if (!inmessage.user || inmessage.user == undefined) {
        context.log('No user data');

        err = new Error('Not tracking user');
        return;
    }

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
            token: userdinmessage.user.instagram.token,
            username: inmessage.user.instagram.username
        };
    }

    outmessage.customProperties.istwitter = inmessage.social.twitter != undefined;
    outmessage.customProperties.isfacebook = inmessage.social.facebook != undefined;
    outmessage.customProperties.isinstagram = inmessage.social.instagram != undefined;

    outmessage.body = inmessage.body;
    outmessage.customProperties.platform = inmessage.platform

    //send message
    serviceBusService.sendTopicMessage(topic, outmessage, function (error) {
        if (error) {
            console.log(error);
        }
    });

    context.done(err, data);
};