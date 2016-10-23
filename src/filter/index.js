var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdb_utils');

var config = {
    DatabaseId: "missingdata",
    FacebookCollectionId: "facebook-profile",
    TwitterCollectionId: "twitter-profile",
    Host: process.env.DocDb_Host,
    AuthKey: process.env.DocDb_AuthKey,
};
config.CollLink = 'dbs/' + config.DatabaseId + '/colls/' + config.TwitterCollectionId

var docDbClient = new DocumentDBClient(config.Host, { masterKey: config.AuthKey });

module.exports = function (context, message) {

    switch (message.social_site) {
        case 1://filter on twitter
context.log(config.CollLink);
context.log(config.TwitterCollectionId);
            docdbUtils.getDocumentByID(docDbClient, config.CollLinkd, '124293141', function (err, results) {

context.log(err);
context.log(results);
                if (!err && results != null) {
context.log('hi c');
                    context.bindings.out = message;
                }
                context.done(err, message);
            });

            break;
        case 2://filter on facebook
            context.done(new Error('Facebook is not implemented yet'), message);
            break;
        default:
            context.done(new Error('unknown type'), message);
            break;
    }

};