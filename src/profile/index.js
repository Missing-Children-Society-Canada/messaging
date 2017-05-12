var sql = require('msnodesql');

var conn_str = "Driver={SQL Server Native Client 11.0};Server=tcp:mcscroot.database.windows.net;UID=mcscroot;PWD=mqRJAxoRd1lvlS1N1UVuhn220OzT0d;Database=social;";

module.exports = function (context, req) {

    sql.open(conn_str, function (err, conn) {
        if (err) {
            console.log("Error opening the connection!");
            return;
        }
        else {
            conn.queryRaw("SELECT * FROM [dbo].[vwProfiles]", function (err, results) {
                if (err) {
                    console.log("Error running query1!");
                    return;
                }

                context.res = {
                    status: 200,
                    body: "WTF"//results.rows
                };
            });
        }
    });

    context.done();
}