const DocumentDBClient = require('documentdb').DocumentClient;
const config = {
    DatabaseId: "mean-dev",
    CollectionId: "users",
    Host: process.env.DocDb_Host,
    AuthKey: process.env.DocDb_AuthKey,
};

config.CollLink = 'dbs/' + config.DatabaseId + '/colls/' + config.CollectionId

module.exports = function (context, message) {

context.log(message);

    let err = null;

    const docDbClient = new DocumentDBClient(config.Host, { masterKey: config.AuthKey });
    const querySpec = {
        query: 'SELECT * FROM c WHERE (c.twitter[\'$id\'] = \'@userid\' AND \'twitter\' = \'@platform\') OR (c.instagram[\'$id\'] = \'@userid\' AND \'instagram\' = \'@platform\') OR (c.facebook[\'$id\'] = \'@userid\' AND \'facebook\' = \'@platform\')',
        parameters: [{
            name: '@userid',
            value: message.userid
        },
        {
            name: '@platform',
            value: message.platform
        }]
    };

    docDbClient.queryDocuments(config.CollLink, querySpec).toArray(function (err, results) {
context.log(err);
context.log(results);
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

        if (!err) {
            data.userid = userdata.id;
            data.platform = message.platform;
            data.mediaid = message.mediaid;

            if (message.twitter) {
                context.log('adding twitter');

                data.twitter = {
                    id: message.twitter.$id,
                    token: message.twitter.token,
                    username: message.twitter.username,
                };
            }

            if (message.instagram) {
                context.log('adding instagram');

                data.instagram = {
                    id: message.instagram.$id,
                    token: message.instagram.token,
                    username: message.instagram.username,
                };
            }

            if (message.facebook) {
                context.log('adding facebook');

                data.facebook = {
                    id: message.facebook.$id,
                    token: message.facebook.token,
                    username: message.facebook.email,
                };
            }
        }

        context.done(err, data);
    });
};