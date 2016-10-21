var azure = require('azure');
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

//confirm messasges should be processed
var serviceBusService = azure.createServiceBusService(config.ServiceBusConnection);

serviceBusService.receiveQueueMessage(config.QueueName, function (error, receivedMessage) {
    if (error) {
        appInsights.client.trackException(error);
    }
    else
    {
     //Work with message   
    }
});