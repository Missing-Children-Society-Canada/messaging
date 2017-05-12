var sql = require('mssql');

module.exports = function (context, req) {

    return new Promise(function (fulfill, reject) {

        var pool = sql.connect('mssql://mcscroot:mqRJAxoRd1lvlS1N1UVuhn220OzT0d@mcscroot.database.windows.net/social?encrypt=true', err => {
            sql.query(`select * from [dbo].[vwProfiles]`, (err, result) => {
                context.res = {
                    status: 200,
                    body: result
                };
            });
        });

        sql.close();
    });
}