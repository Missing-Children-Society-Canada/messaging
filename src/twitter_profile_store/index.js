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

module.exports = function (context, req) {
    
    const request = new sql.Request();

    request.execute('[dbo].[SaveTwitterProfile]');

    context.done();
}