var sql = require('mssql');


//var conn_str = "Driver={SQL Server Native Client 11.0};Server=tcp:mcscroot.database.windows.net;UID=mcscroot;PWD=mqRJAxoRd1lvlS1N1UVuhn220OzT0d;Database=social;";

module.exports = function (context, req) {

    var config = {
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
    
    var conn = new sql.Connection(config);

    conn.connect()
        .then(function () {

            // Create request instance, passing in connection instance
            var req = new sql.Request(conn);

            // Call mssql's query method passing in params
            req.query("SELECT * FROM [SalesLT].[Customer]")
                .then(function (recordset) {

                    context.res = {
                        status: 200,
                        body: recordset
                    };

                    conn.close();
                })
                // Handle sql statement execution errors
                .catch(function (err) {
                    console.log(err);
                    conn.close();
                })

        })
        // Handle connection errors
        .catch(function (err) {
            console.log(err);
            conn.close();
        });
    // sql.open(conn_str, function (err, conn) {
    //     if (err) {
    //         context.res = {
    //             status: 500
    //         };
    //         return;
    //     }
    //     else {
    //         conn.queryRaw("SELECT * FROM [dbo].[vwProfiles]", function (err, results) {
    //             if (err) {
    //                 console.log("Error running query1!");
    //                 return;
    //             }

    //             context.res = {
    //                 status: 200,
    //                 headers: {
    //                     'Access-Control-Allow-Origin': '*'
    //                 },
    //                 body: "WTF"//results.rows
    //             };
    //         });

    //         return;
    //     }
    // });
    context.done();
}