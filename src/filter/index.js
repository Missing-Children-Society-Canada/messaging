var DocumentDBClient = require('documentdb').DocumentClient;
var providers = require('..\constants').providers;

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
        case providers.twitter://filter on twitter

            docDbClient.readDocument(config.CollLink + '/docs/' + message.userid, function (err, results) {

                if (!err && results != null) {
                    context.bindings.out = message;
                }

                context.done(err, message);
            });

            break;
        case providers.facebook://filter on facebook
            context.done(new Error('Facebook is not implemented yet'), message);
            break;
        case providers.instagram://filter on ig - see ig_media_filter
            break;

        default:
            context.done(new Error('unknown type'), message);
            break;
    }
};