var util = require('util');

const DocumentDBClient = require('documentdb').DocumentClient;
const config = {
    CollLink: 'dbs/reporting/colls/accesstokens',
    Host: process.env.DocDb_Host,
    AuthKey: process.env.DocDb_AuthKey,
};

module.exports = function (context, req) {
    
    var statusCode = 400;
    var responseBody = "Invalid request object";

    //something was passed in
    if (typeof req.body != 'undefined' && typeof req.body == 'object') {
     
        var myReq = req.body;
        var myAccess = new AccessRequest(myReq.userid,myReq.token);

        context.log(myAccess.token);
        context.log(myAccess.userid);

        const docDbClient = new DocumentDBClient(config.Host, { masterKey: config.AuthKey });
        const query =  util.format('SELECT * FROM c where c.accesstoken=\'%s\' and c.userid=\'%s\'',myAccess.token,myAccess.userid);

        context.log(query);

        const options = {
            enableCrossPartitionQuery: true
        }

        docDbClient.queryDocuments(config.CollLink, query, options).toArray(function (err, results) {
            
            var accessResult = "false";

            if(results.length == 0){
                context.log("document does not exist");
            } else {
                context.log("document exists");
                accessResult = "true";
            }

            statusCode = "200";
            context.bindings.res = accessResult;
            context.done();
        });

    }

};

function AccessRequest(userid,token){
    this.userid = userid;
    this.token = token;
}