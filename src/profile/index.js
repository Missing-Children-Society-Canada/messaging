var sql = require('mssql');


//var conn_str = "Driver={SQL Server Native Client 11.0};Server=tcp:mcscroot.database.windows.net;UID=mcscroot;PWD=mqRJAxoRd1lvlS1N1UVuhn220OzT0d;Database=social;";

module.exports = function (context, req) {

    try {

        const pool = await sql.connect('mssql://mcscroot:mqRJAxoRd1lvlS1N1UVuhn220OzT0d@mcscroot.database.windows.net/social?encrypt=true')
        const result = await sql.query`select * from [dbo].[vwProfiles]`
        context.res = {
            status: 200,
            body: result
        };

    } catch (err) {
        // ... error checks 
    }

    context.done();
}