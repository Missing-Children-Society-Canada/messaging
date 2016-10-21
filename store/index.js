var azure = require('azure');
var DocumentDBClient = require('documentdb').DocumentClient;
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();

module.exports = function(context, message) {
    context.done();
};