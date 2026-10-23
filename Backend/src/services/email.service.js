import nodemailer from "nodemailer";
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.log('something went wrong');
    } else {
        console.log("server is ready to send mails");
    }
});

const sendEmail = async (to, subject = "", html = "<h1>Hello</h1>") => {
    try {
        const info = await transporter.sendMail({
            from: 'fleetmanav@gmail.com',
            to,
            subject,
            html
        })

        console.log("email sent", info);
    } catch (err) {
        throw err;
    }
}

export default sendEmail;