const sql = require('mssql');

const config = {
    server: "mcsc.database.windows.net",
    database: "social",
    user: "mcscroot",
    password: "mqRJAxoRd1lvlS1N1UVuhn220OzT0d",
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