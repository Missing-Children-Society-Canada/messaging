var azure = require('azure');
var DocumentDBClient = require('documentdb').DocumentClient;
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

//Store data from service bus messages
module.exports = function(context, message) {
    context.log('Node.js ServiceBus queue trigger function processed message', message);
    context.done();
};