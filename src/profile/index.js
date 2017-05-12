var sql = require('msnodesql');

module.exports = function (context, req) {
    var conn_str = "Driver={SQL Server Native Client 11.0};Server=tcp:mcsc.database.windows.net;UID=mcscroot;PWD=mqRJAxoRd1lvlS1N1UVuhn220OzT0d;Database=social;";

    sql.open(conn_str, function (err, conn) {
        if (err) {
            context.res = {
                status: 500,
                body: err
            }
        }
        else {
            conn.queryRaw("SELECT * FROM [dbo].[vwProfiles]", function (err, results) {
                if (err) {
                    context.res = {
                        status: 500,
                        body: err
                    }
                }
                else {
                    /**
                    for (var i = 0; i < results.rows.length; i++) {
                        results.rows[i][0]
                    }
                    */
                    context.res = {
                        status: 200,
                        body: results.rows
                    };
                }
            });
        }
    });
    context.done();
}