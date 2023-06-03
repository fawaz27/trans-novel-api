
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';


export default class EmailService{

    private nodemailerTransport: Mail;


    constructor() {
        this.nodemailerTransport = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          }
        });
      }
     
    sendMail(options: Mail.Options) {
        
    return this.nodemailerTransport.sendMail(options);
    }
}