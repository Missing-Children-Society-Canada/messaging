var sql = require('mssql');

module.exports = function (context, req) {

    try {

        var pool = await sql.connect('mssql://mcscroot:mqRJAxoRd1lvlS1N1UVuhn220OzT0d@mcscroot.database.windows.net/social?encrypt=true')
        var result = await sql.query`select * from [dbo].[vwProfiles]`
        context.res = {
            status: 200,
            body: result
        };

    } catch (err) {
        // ... error checks 
    }

    context.done();
}