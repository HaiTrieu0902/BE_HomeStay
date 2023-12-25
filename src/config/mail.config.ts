import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

export const tranporter = nodemailer?.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_HOST_ADDRES,
        pass: process.env.MAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: true,
    },
});

export const mailerOptions = (tokenEmail: string, email: string, user: string, host: any) => {
    return {
        from: `HomeStay ${process.env.MAIL_HOST_ADDRES}`,
        to: email,
        subject: '[Verify email to continue with the registration step]',
        html: `<h2>${user}! Thanks for resister on our site</h2>
        <h4>Please check you mail to continue...</h4>
        <a href="http://${host}/auth/verify-email/${tokenEmail}">Verify this here</a>`,
    };
};
