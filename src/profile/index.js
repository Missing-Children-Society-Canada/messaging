var sql = require('mssql');

module.exports = function (context, req) {

    var pool = sql.connect('mssql://mcscroot:mqRJAxoRd1lvlS1N1UVuhn220OzT0d@mcscroot.database.windows.net/social?encrypt=true', err => {
        var result = sql.query(`select * from [dbo].[vwProfiles]`, (err, result) => {
            context.res = {
                status: 200,
                body: result
            };
        });
    });

    context.done();
}