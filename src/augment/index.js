var azure = require('azure');
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

//add extraa data to messages
//sentiment analysis?
module.exports = function(context, message) {
    context.log('Node.js ServiceBus queue trigger function processed message', message);
    context.done();
};