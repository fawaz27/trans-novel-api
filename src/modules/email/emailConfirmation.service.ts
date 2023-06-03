import EmailService from "./email.service";
import jwt from 'jsonwebtoken';
import VerificationTokenPayload from "../../interfaces/verificationTokenPayload.interface";
import BadRequestException from "../../exceptions/BadRequestException";
import { UserService } from "../user/user.service";

export default class EmailConfirmationService{

    private emailService:EmailService;
    private userService:UserService;

    constructor(){
        this.emailService = new EmailService();
        this.userService = new UserService();
    }

    public async sendVerificationLink(email: string) {
        
        const payload: VerificationTokenPayload = { email };
        const expiresIn = process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME;
        const secret =  process.env.JWT_VERIFICATION_TOKEN_SECRET;

        const token = jwt.sign(payload,secret as string,{ expiresIn:`${expiresIn}s` });

        const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;
        const text = `Welcome to the application. To confirm the email address, click here: ${url}`;        
        const result = await this.emailService.sendMail({
            from:`"NovelsTranslate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Email confirmation",
            text: text
        });

        console.log(result);
        console.log('-------------------------------------------------------------');
        console.log(token);
          
        return result;
    }

    public async confirmEmail(email:string){
        const user = await this.userService.getUserByEmail(email);
        if (user?.isEmailConfirmed) {
            throw new BadRequestException('Email already confirmed');
        }
        const result = await this.userService.markEmailAsConfirmed(email);
        console.log(result);
        return result ;
    }

    public async decodeConfirmationToken(token: string) {
        const secret =  process.env.JWT_VERIFICATION_TOKEN_SECRET;
        try {
            const payload = jwt.verify(token,secret as string);
            if(typeof payload === 'object' && 'email' in payload)
                return payload.email;
            throw new BadRequestException('Error');

        } catch (error:any) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Email confirmation token expired');
            }
                throw new BadRequestException('Bad confirmation token');
        }
    }

    public async resendConfirmationLink(userId: number) {
        const user = await this.userService.getUserById(userId);
        if (user.isEmailConfirmed) {
            throw new BadRequestException('Email already confirmed');
        }
        const result = await this.sendVerificationLink(user.email);
        console.log(result);
        
        return result;
    }

}