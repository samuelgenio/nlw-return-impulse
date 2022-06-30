import { SendMailData, MailAdapter } from "../mailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp....",
    port: 2525,
    auth: {
        user: "user...",
        pass: "pass"
    }
});

export class NodeMailerAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {

        transport.sendMail({
            from: "Equipe ....",
            to: "Destino",
            subject: subject,
            html: body
        })

    }
}