var azure = require('azure');
var DocumentDBClient = require('documentdb').DocumentClient;
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

//Store data from service bus messages
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