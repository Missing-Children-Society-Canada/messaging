const DocumentDBClient = require('documentdb').DocumentClient;
const config = {
    DatabaseId: "mean-dev",
    CollectionId: "users",
    Host: process.env.DocDb_Host,
    AuthKey: process.env.DocDb_AuthKey,
};

config.CollLink = 'dbs/' + config.DatabaseId + '/colls/' + config.TwitterCollectionId

module.exports = function (context, message) {

    let err = null;

    const docDbClient = new DocumentDBClient(config.Host, { masterKey: config.AuthKey });
    var querySpec = {
        query: 'SELECT * FROM c WHERE (c.twitter[\'$id\'] = @userid AND \'twitter\' = @platform) AND (c.instagram[\'$id\'] = @userid AND \'instagram\' = @platform) AND (c.facebook[\'$id\'] = @userid AND \'facebook\' = @platform)',
        parameters: [{
            name: '@userid',
            value: message.userid
        },
        {
            name: '@platform',
            value: message.platform
        }]
    };

    docDbClient.queryCollections(config.CollLink, querySpec).toArray(function (err, results) {
        context.log(results);//TEMP LOGGING
        let userdata = results[0];
        context.log(userdata);//TEMP LOGGING

        if (!userdata || userdata == undefined) {
            console.log('Not tracking user');

            err = new Error('Not tracking user');
        }

        if (!userdata.twitter && !userdata.facebook || !userdata.instagram) {
            console.log('No social profiles');

            err = new Error('No social profiles');
        }

        if (!userdata.id) {
            console.log('No user id');

            err = new Error('No social profiles');
        }

        let data = new Object();

        if (!err) {
            data.userid = userdata.id;
            data.platform = message.platform;
            data.mediaid = message.mediaid;

            if (message.twitter) {
                console.log('adding twitter');

                data.twitter = {
                    id: message.twitter.$id,
                    token: message.twitter.token,
                    username: message.twitter.username,
                };
            }

            if (message.instagram) {
                console.log('adding instagram');

                data.instagram = {
                    id: message.instagram.$id,
                    token: message.instagram.token,
                    username: message.instagram.username,
                };
            }

            if (message.facebook) {
                console.log('adding facebook');

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