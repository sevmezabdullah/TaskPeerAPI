import nodemailer from 'nodemailer';
import { IEmail } from '../interfaces/IEmail';
import { injectable } from 'inversify';
import { envConfig } from '../utils/envConfig';

import path from 'path';
import fs from 'fs';
import handlerbars from 'handlebars';


@injectable()
export class Email implements IEmail {
    sendEmail(to: string, subject: string, text: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    sendEmailWithAttachment(to: string, subject: string, text: string, attachment: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async sendVerificationEmail(to: string, token: string): Promise<void> {

        const emailTemplateSource = fs.readFileSync(path.join(__dirname, '../templates/email_verification.hbs'), 'utf8');
        const template = handlerbars.compile(emailTemplateSource);
        const htmlToSend = template({ token: token });
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
            html: htmlToSend

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