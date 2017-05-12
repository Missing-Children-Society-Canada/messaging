const sql = require('mssql');
const config = {
    server: "mcsc.database.windows.net", // Use your SQL server name
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
    var saved_pool;
    return sql.connect(config).then(pool => {
        saved_pool = pool;
        return pool.request()
            .query('select * from [dbo].[vwProfiles]')
    }).then(result => {
        context.log(result);
        context.res = {
            status: 200,
            body: result
        };
        return saved_pool.close();
    });
}