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
    })

    context.done();
}

