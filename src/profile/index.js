//var sql = require('msnodesql');

module.exports = function (context, req) {
    /**
    var conn_str = "Driver={SQL Server Native Client 11.0};Server=tcp:mcsc.database.windows.net;UID=mcscroot;PWD=mqRJAxoRd1lvlS1N1UVuhn220OzT0d;Database={social};";
    sql.open(conn_str, function (err, conn) {
        if (err) {
            context.res = {
                status: 500,
                body: err
            }
        }
        else {
            **/
    context.res = {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'SuperSecret':'hahaha'
        },
        body: [
            {
                "id": "785a9b14-a9b8-457b-a851-803d3cd1a93e",
                "name": "SABU",
                "picture": "http://www.weirdworm.com/img/misc/10-weird-superheroes/sabu.jpg",
                "datetime": new Date(),
                "twitter": true,
                "facebook": true,
                "instagram": true
            },
            {
                "id": "122c1de2-4b4f-49b9-9faa-d07b30f79990",
                "name": "MATTER - EATER LAD",
                "picture": "http://www.weirdworm.com/img/misc/10-weird-superheroes/matter-eater-lad.jpg",
                "datetime": new Date(),
                "twitter": true,
                "facebook": true,
                "instagram": true
            },
            {
                "id": "088b384f-6eec-4a35-be8d-d251557b1fef",
                "name": "ARM FALL OFF BOY",
                "picture": "http://www.weirdworm.com/img/misc/10-weird-superheroes/arm-fall-off-boy.jpg",
                "datetime": new Date(),
                "twitter": true,
                "facebook": true,
                "instagram": true
            },
            {
                "id": "4792d5d3-dec4-42d7-b188-5e9d34a216cf",
                "name": "BOUNCING BOY",
                "picture": "http://www.weirdworm.com/img/misc/10-weird-superheroes/bouncing-boy.jpg",
                "datetime": new Date(),
                "twitter": true,
                "facebook": true,
                "instagram": true
            },
            {
                "id": "d7b9e9a7-1e0c-4c3b-b73a-8f670ec4f6b1",
                "name": "SUPERDUPONT",
                "picture": "http://www.weirdworm.com/img/misc/10-weird-superheroes/superdupont.jpg",
                "datetime": new Date(),
                "twitter": true,
                "facebook": true,
                "instagram": true
            },
        ]
    };
    /**
}
});
*/
    context.done();
}