const sql = require('mssql');
const config = {
    server: "mcscroot.database.windows.net", // Use your SQL server name
    database: "social", // Database to connect to
    user: "mcscroot", // Use your username
    password: "mqRJAxoRd1lvlS1N1UVuhn220OzT0d", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
        encrypt: true
    }
};

module.exports = function (context, req) {
    sql.connect(config).then(pool => {
        return pool.request()
            .query('select * from [dbo].[vwProfiles]')
    }).then(result => {
        context.res = {
            status: 200,
            body: result
        };
    }).catch(err => {
        context.log(err);
    })

    sql.on('error', err => {
        context.log(err);
    })
}