var DocumentDBClient = require('documentdb').DocumentClient;

var config = {
    DatabaseId: "missingdata",
    FacebookCollectionId: "facebook-profile",
    TwitterCollectionId: "twitter-profile",
    Host: process.env.DocDb_Host,
    AuthKey: process.env.DocDb_AuthKey,
};
config.collLink = 'dbs/' + config.DatabaseId + '/colls/' + config.TwitterCollectionId

var docDbClient = new DocumentDBClient(config.Host, { masterKey: config.AuthKey });

module.exports = function (context, message) {
    //fliter on twitter handle
    context.bindings.out = message;
    context.done();
};