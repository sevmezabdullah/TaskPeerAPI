export interface IEmail {
    sendEmail(to: string, subject: string, text: string): Promise<void>;
    sendEmailWithAttachment(to: string, subject: string, text: string, attachment: string): Promise<void>;
    sendVerificationEmail(to: string, token: string): Promise<void>;
}