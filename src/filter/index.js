var azure = require('azure');
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

//confirm messasges should be processed
module.exports = function(context, message) {
    context.log('Node.js ServiceBus queue trigger function processed message', message);
    context.done();
};