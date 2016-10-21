var DocumentDBClient = require('documentdb').DocumentClient;
var appInsights = require("applicationinsights");

appInsights.setup("XXXXXXXXXXXXXXXXXXX").start();

//Store data from service bus messages