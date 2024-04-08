import nodemailer from 'nodemailer';
import { IEmail } from '../interfaces/IEmail';
import { injectable } from 'inversify';


@injectable()
export class Email implements IEmail {
    sendEmail(to: string, subject: string, text: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    sendEmailWithAttachment(to: string, subject: string, text: string, attachment: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    sendVerificationEmail(to: string, token: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}