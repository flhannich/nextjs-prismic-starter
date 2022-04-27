const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {

    let data = JSON.parse(event.body)

    let settings = {
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: true,
        logger: true,
        debug: true,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    }

    let message = {
        from: process.env.SMTP_EMAIL_ADRESS,
        to: process.env.SMTP_RECIPIENT,
        subject: `Sending with React, Nodemailer and Netlify`,
        html: `
                <h3>Email from ${data.name} ${data.email}<h3>
                <p>${data.message}<p>
                <p>Legal Accepted: ${data.legal}<p>
            `
    }

    let transporter = nodemailer.createTransport(settings);

    transporter.sendMail(message, function(error, info) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                   'result': 'success'
            })
        });
        }
    });
}