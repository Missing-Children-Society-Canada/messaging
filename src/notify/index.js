require('dotenv').config();
var util = require('util');

module.exports = function (context, message) {
    var helper = require('sendgrid').mail;

    from_email = new helper.Email(process.env.NotifyEmailFrom);
    to_email = new helper.Email(process.env.NotifyEmailTo);
    subject = "Missing Children of Canada Alert";
    var msgContent = util.format("A new missing child has been added to the dashboard. Please visit the dashboard at the following link: %s", process.env.DashboardURL);
    content = new helper.Content("text/plain", msgContent);
    mail = new helper.Mail(from_email, subject, to_email, content);

    // Set to high importance
    header = new helper.Header("Priority", "Urgent");
    mail.addHeader(header);
    header = new helper.Header("Importance", "high");
    mail.addHeader(header);

    var sg = require('sendgrid')(process.env.SendGridAPIKey);

    var requestBody = mail.toJSON();
    var emptyRequest = require('sendgrid-rest').request;
    var requestPost = JSON.parse(JSON.stringify(emptyRequest));
    requestPost.method = 'POST';
    requestPost.path = '/v3/mail/send';
    requestPost.body = requestBody;
    sg.API(requestPost, function (error, response) {
        context.log(response.statusCode);
        context.log(response.headers);
        if (error){
            returnFail(response.statusCode,"Error occurred sending email", context);
        } else {
            returnSuccess(200,"Email sent", context);
        }
        
    })
    
}

//helper function to set response code and message and complete the function (context.done())
function returnSuccess(statusCode, Message, context){
        var defaultstatusCode = 201;
        var defaultresponseBody = "Access Token Created, Email Sent";
        context.res = { status : (statusCode?statusCode:defaultstatusCode),
                        body: (Message?Message:defaultresponseBody)};
        context.done();
}

//helper function to set response code and message and complete the function (context.done())
function returnFail(statusCode,Message,context){
        var defaultstatusCode = 400;
        var defaultresponseBody = "Invalid request object";
        context.res = { status : (statusCode?statusCode:defaultstatusCode),
                        body: (Message?Message:defaultresponseBody)};
        context.done();
}
