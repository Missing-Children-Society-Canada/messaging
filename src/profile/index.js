var sql = require('mssql');

module.exports = function (context, req) {

    var pool = sql.connect('mssql://mcscroot:mqRJAxoRd1lvlS1N1UVuhn220OzT0d@mcscroot.database.windows.net/social?encrypt=true')
        .then(function () {
            var result = await sql.query(`select * from [dbo].[vwProfiles]`)
                .then(function (result) {
                    context.res = {
                        status: 200,
                        body: result
                    };
                });
        });

    context.done();
}