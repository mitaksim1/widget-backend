import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

// Config de mailtrap avec Nodemailer
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2f0e8f30b51356",
        pass: "0119613be39a04"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        
        await transport.sendMail({
            from: 'Equipe Feedget <hello@feedget.com>',
            to: 'Miriam Simonnet <miriamt.simonnet@gmail.com>',
            subject,
            html: body,
        });
    };
}