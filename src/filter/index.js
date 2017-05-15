const DocumentDBClient = require('documentdb').DocumentClient;
const config = {
    DatabaseId: "mean-dev",
    CollectionId: "users",
    Host: process.env.DocDb_Host,
    AuthKey: process.env.DocDb_AuthKey,
};

config.CollLink = 'dbs/' + config.DatabaseId + '/colls/' + config.CollectionId

module.exports = function (context, message) {

    let err = null;

    const docDbClient = new DocumentDBClient(config.Host, { masterKey: config.AuthKey });
    const query = 'SELECT * FROM c WHERE (c.twitter[\'$id\'] = \'' + message.userid + '\' AND \'twitter\' = \'' + message.platform + '\') OR (c.instagram[\'$id\'] = \'' + message.userid + '\' AND \'instagram\' = \'' + message.platform + '\') OR (c.facebook[\'$id\'] = \'' + message.userid + '\' AND \'facebook\' = \'' + message.platform + '\')';

    docDbClient.queryDocuments(config.CollLink, query).toArray(function (err, results) {

        let userdata = results[0];

        if (!userdata || userdata == undefined) {
            context.log('Not tracking user');

            err = new Error('Not tracking user');
            return;
        }

        if ((!userdata.twitter || userdata.twitter == undefined)
            && (!userdata.facebook || userdata.facebook == undefined)
            || (!userdata.instagram || userdata.instagram == undefined)) {
            context.log('No social profiles');

            err = new Error('No social profiles');
            return;
        }

        if (!userdata.id) {
            context.log('No user id');

            err = new Error('No social profiles');
            return;
        }

        let data = new Object();

        data.userid = userdata.id;
        data.platform = message.platform;
        data.mediaid = message.mediaid;

        if (userdata.twitter) {
            context.log('adding twitter');

            data.twitter = {
                id: userdata.twitter.$id,
                token: userdata.twitter.token,
                username: userdata.twitter.username,
            };
        }

        if (userdata.instagram) {
            context.log('adding instagram');

            data.instagram = {
                id: userdata.instagram.$id,
                token: userdata.instagram.token,
                username: userdata.instagram.username,
            };
        }

        if (userdata.facebook) {
            context.log('adding facebook');

            data.facebook = {
                id: userdata.facebook.$id,
                token: userdata.facebook.token,
                username: userdata.facebook.email,
            };
        }

        context.binding.out = data;

        context.done(err, data);
    });
};