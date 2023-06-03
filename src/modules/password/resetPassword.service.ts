import BadRequestException from "../../exceptions/BadRequestException";
import VerificationTokenPayload from "../../interfaces/verificationTokenPayload.interface";
import EmailService from "../email/email.service";
import jwt from 'jsonwebtoken';
import { UserService } from "../user/user.service";



export default class ResetPasswordService{

    private emailService:EmailService;
    private userService:UserService;

    constructor(){
        this.emailService = new EmailService();
        this.userService = new UserService();
    }

    public async checkEmail(email :string){
        const user = await this.userService.getUserByEmail(email);

        if(user)
            return user.email;
        else
            throw new BadRequestException('Invalid user email');
    }

    public async sendResetLink(email: string) {

        const payload: VerificationTokenPayload = { email };
        const expiresIn = process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRATION_TIME;
        const secret =  process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;

        const token = jwt.sign(payload,secret as string,{ expiresIn:`${expiresIn}s` });

        const url = `${process.env.EMAIL_RESET_PASSWORD_URL}?token=${token}`;
        const text = `Welcome to the application. To reset your password, click here: ${url}`;
    
        const result = await this.emailService.sendMail({
            from:'"NovelsTranslate" <boukarifawas27@gmail.com>',
            to: email,
            subject: "Reset password",
            text: text
        });
        console.log(result);
        
        return result;
    }

    public async decodeResetToken(token: string) {
        const secret =  process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;
        try {
            const payload = jwt.verify(token,secret as string);
            if(typeof payload === 'object' && 'email' in payload)
                return payload.email;
            throw new BadRequestException('Error');

        } catch (error:any) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Reset password token expired');
            }
                throw new BadRequestException('Bad reset password token');
        }
    }
    
    public async resetPassword(email:string,password:string){
        await this.userService.getUserByEmail(email);
        const result = await this.userService.updatePassword(email,password);
        console.log(result);
        return result ;
    }

}