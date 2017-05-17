require('dotenv').config();
var util = require('util');

module.exports = function (context, req) {

    var statusCode = 400;
    var responseBody = "Invalid request object";

    if (typeof req.body != 'undefined' && typeof req.body == 'object') {
        
        statusCode = 201;
        //context.bindings.outTable = req.body;
        var myReq = req.body;
        var myToken = new oAccessToken(myReq.userid,myReq.email,guid());

        context.log('------>' + myToken.email);
        context.log('------>' + myToken.userid);
        context.log('------>' + myToken.accesstoken);
        context.log('------>' + myToken.expires);

        //save to document db
        context.bindings.out = myToken;

        //send mail
        sendMail(myToken.userid,myToken.email,myToken.accesstoken);

        responseBody = "Access Token Created, Email Sent";
    }

    context.res = {
        status: statusCode,
        body: responseBody
    };

    context.done();
}

function sendMail(userid,email,token) {

    console.log('Sending Notification');

    var toEmail = email;
    var userId = userid
    var userToken = token;
    var profileUrl = util.format("%s%s?access_token=%s",process.env.DashboardProfileUrl, userId, userToken);

    console.log('------>' + profileUrl);

    var msgContent = util.format("Please view the profile here: %s", profileUrl);

    var helper = require('sendgrid').mail;
    
    from_email = new helper.Email(process.env.NotifyEmailFrom);
    to_email = new helper.Email(toEmail);
    subject = "Missing Children of Canada Alert";
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
        console.log(response.statusCode);
        // console.log(response.body);
        // console.log(response.headers);
    })

}

function storeToken(userId, access_token) {
    //store id / token to the db
}

function oAccessToken(userid,email,accesstoken) {
    this.userid = userid;
    this.email = email;
    this.accesstoken = accesstoken;
    this.expires = getCurrentDate();
}

function getCurrentDate() {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    dt.offsetInDays(1);
    var formatted = dt.format('Y-m-d H:M:S');
    return formatted;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

