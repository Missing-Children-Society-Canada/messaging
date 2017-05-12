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
    return sql.connect(config).then(pool => {
        return pool.request()
            .query('select * from [dbo].[vwProfiles]')
    }).then(result => {
        context.log(result);
        context.res = {
            status: 200,
            body: result
        };
        return sql.close();
    });
}