import nodemailer from 'nodemailer';
import { IEmail } from '../interfaces/IEmail';
import { injectable } from 'inversify';
import { envConfig } from '../utils/envConfig';


@injectable()
export class Email implements IEmail {
    sendEmail(to: string, subject: string, text: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    sendEmailWithAttachment(to: string, subject: string, text: string, attachment: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async sendVerificationEmail(to: string, token: string): Promise<void> {
        const transporter = nodemailer.createTransport({

            service: envConfig.EMAIL_SERVICE,
            host: envConfig.EMAIL_HOST,
            auth: {
                user: envConfig.EMAIL_USER,
                pass: envConfig.EMAIL_PASSWORD
            },

        });


        const mailOptions = {
            from: envConfig.EMAIL_USER,
            to: to,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/api\/auth\/confirmation\/' + token + '.\n'
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });


    }
}