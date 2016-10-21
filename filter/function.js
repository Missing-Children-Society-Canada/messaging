var azure = require('azure');
var appInsights = require("applicationinsights");
var config = require('./config');

appInsights.setup(config.AppInsightsKey).start();