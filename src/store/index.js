const sql = require('mssql');

const config = {
    server: process.env.SqlServer,
    database: process.env.SqlDatabase,
    user: process.env.SqlUser,
    password: process.env.SqlPassword,
    port: 1433,
    options: {
        encrypt: true
    }
};

let providers = require('..\constants').providers;

module.exports = function (context, message) {

    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    var social_site = providers.getProvider(message.social_site);

    var content = {
        id: message.tweetid || message.media_id,
        social_site: social_site,
        content: message.tweettext || message.media_text
    };

    var data = {
        id: id,
        registered_account_id: message.userid,
        is_archived: false,
        archived_by: 0,
        last_update: new Date(),
        created_date: new Date(),
        log: message.longitude,
        lat: message.latitude,
        profilepic: message.profileimageurl,
        photos: message.photos,
        social_content: [content]
    };

    const request = new sql.Request()
    request.input('Identifier', sql.UniqueIdentifier, id);
    request.input('AccountId', sql.NvarChar, message.userid);
    request.input('MediaId', sql.NvarChar, content.id);
    request.input('CreatedOn', sql.DateTime, new Date());
    request.input('LastUpdatedOn', sql.DateTime, new Date());
    request.input('Content', sql.NVarChar, content.content);

    request.execute('[dbo].[StoreSocialInteraction]', (err, result) => {

    });

    context.bindings.out = data;

    context.done();
};