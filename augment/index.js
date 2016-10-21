var azure = require('azure');
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

//add extraa data to messages
//sentiment analysis?
var serviceBusService = azure.createServiceBusService(config.ServiceBusConnection);