const nodemailer = require('nodemailer');

exports.handler = function(event, context, callback) {

    let data = JSON.parse(event.body)


    const generateMessage = data => {
        let string = '';
        for (const [key, value] of Object.entries(data)) {
            string += `<strong>${key}</strong><br>${value.message}<br><br>`
        }
        return string;
    }


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
        subject: `E-mail from ${data.data.name.message}`,
        html: `${generateMessage(data.data)}`
    }
    
    let transporter = nodemailer.createTransport(settings);

    transporter.sendMail(message, function(error, info) {
        if (error) {
            callback(error);
        } else {
            callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            })
        });
        }
    });
}