import nodeMailer from "nodemailer";
import { sendOTPEmail } from "../templates/sendOTPEmail.js";


export const sendEmailOTP = async ({ email, verificationCode, logo }) => {
    try {
        const transport = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const options = {
            from: `"Winku" <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: "Your Email Verification Code",
            html: sendOTPEmail(verificationCode, logo),
        };

        await transport.sendMail(options);
        console.log('Email OTP sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};


export const ForgetPasswordEmail = async ({ email, message, logo }) => {
    try {
        const transport = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const options = {
            from: `"Winku" <${process.env.SMTP_MAIL}>`,
            to: email,
            subject: "Your Email Verification Code",
            html:message,
            // html: sendOTPEmail(ForgetUrl, logo),
        };

        await transport.sendMail(options);
        console.log('Email Forget sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
