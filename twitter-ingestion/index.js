var azure = require('azure');
var appInsights = require("applicationinsights");
var twitterClient = require('./twitter');
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

var serviceBusService = azure.createServiceBusService(config.ServiceBusConnection);

var T = new twitterClient({
    consumer_key: config.ConsumerKey,
    consumer_secret: config.ConsumerSecret,
    access_token: config.AccessToken,
    access_token_secret: config.AccessTokenSecret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
})

var stream = T.stream('statuses/filter', {
    track: [config.HashTag]
})

stream.on('tweet', function (tweet) {
    var startTime = Date.now();
    var success = true;

    var data = {
        content: tweet,
        type: 1
    };
    var message = JSON.stringify(data);

    serviceBusService.sendQueueMessage('twitter', message, function (error) {
        if (error) {
            success = false;
            appInsights.client.trackException(error);
        }
    });

    appInsights.client.trackDependency("servicebus-twitter", "send", Date.now() - startTime, success);
});