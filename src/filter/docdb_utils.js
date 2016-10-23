var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {
    getOrCreateDatabase: function (client, databaseId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id= @id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

        client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };

                    client.createDatabase(databaseSpec, function (err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    },

    getOrCreateCollection: function (client, databaseLink, collectionId, callback) {
        console.log(databaseLink);
        var querySpec = {
            query: 'SELECT * FROM root r WHERE id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };

        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                if (results.length === 0) {
                    var collectionSpec = {
                        id: collectionId
                    };

                    client.createCollection(databaseLink, collectionSpec, function (err, created) {
                        callback(null, created);
                    });

                } else {
                    callback(null, results[0]);
                }
            }
        });
    },

    getDocuments: function (client, databaseLink, collectionId, callback) {

        var querySpec = {
            query: 'SELECT * FROM root r',

        };
        client.queryDocuments(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {

                callback(null, results);

            }
        });

    },

    getDocumentByID: function (client, databaseLink, id, callback) {

        var querySpec = {
            query: 'SELECT * FROM root r WHERE id=@id',
            parameters: [{
                name: '@id',
                value: id
            }]

        };
        client.queryDocuments(databaseLink, querySpec).toArray(function (err, result) {
            if (err) {
                callback(err);

            } else {
                callback(null, result);
            }
        });

    }

};



module.exports = DocDBUtils;