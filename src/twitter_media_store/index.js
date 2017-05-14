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

module.exports = function (context, message) {

    const request = new sql.Request()
    request.input('Identifier', sql.UniqueIdentifier, message.tweetid || message.media_id);
    request.input('AccountId', sql.NvarChar, message.userid);
    request.input('MediaId', sql.NvarChar, content.id);
    request.input('CreatedOn', sql.DateTime, new Date());
    request.input('LastUpdatedOn', sql.DateTime, new Date());
    request.input('Content', sql.NVarChar, message.tweettext || message.media_text);

    request.execute('[dbo].[SaveSocialInteraction]');

    context.done();
};