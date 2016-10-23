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

    switch (message.social_site) {
        case 1://filter on twitter
            context.bindings.out = message;
            context.done();
            break;
        case 2://filter on facebook
            context.done(new Error('Facebook is not implemented yet'), message);
            break;
        default:
            context.done(new Error('unknown type'), message);
            break;
    }

};