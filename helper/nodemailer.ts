export function getNodeMailerTransporter() {
    let nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: 'studentenfuttermmp3@gmail.com',
            pass: `${process.env.PASSWORD}`,
        },
        secure: true,
    });
    return transporter;
}
