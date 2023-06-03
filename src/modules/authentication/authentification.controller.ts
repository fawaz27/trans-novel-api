import express, { CookieOptions } from 'express';
import { AuthentificationService } from './authentification.service';
import validationMiddleware from '../../middlewares/validationMiddleware';
import logInDto from './login.dto';
import CreateUserDto from '../user/user.dto';
import EmailConfirmationService from '../email/emailConfirmation.service';
import ForgotPasswordDto from '../password/forgotPassword.dto';
import ResetPasswordService from '../password/resetPassword.service';
import  jwt from 'jsonwebtoken';
import DataStoredInToken from '../../interfaces/dataStoredInToken.interface';
import { UserService } from '../user/user.service';
import WrongAuthenticationTokenException from '../../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../../exceptions/AuthenticationTokenMissingException';


export class AuthentificationController{

    public path = '/auth';
    public router = express.Router();
    private authService:AuthentificationService;
    private userService:UserService;
    private emailConfirmationService:EmailConfirmationService;
    private resetPasswordService:ResetPasswordService;

    constructor(){      
      this.authService = new AuthentificationService();
      this.userService = new UserService();
      this.emailConfirmationService = new EmailConfirmationService();
      this.resetPasswordService = new ResetPasswordService();
      this.initializeRoutes();
    }

    
    
    private initializeRoutes()
    {
        this.router.post(`${this.path}/register`,validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`,validationMiddleware(logInDto), this.logIn);
        this.router.post(`${this.path}/forgotPassword`,validationMiddleware(ForgotPasswordDto), this.forgotPassword);
        this.router.post(`${this.path}/logout`, this.logOut);
        this.router.post(`${this.path}/infos`, this.infos)
        
    }

    public  registration = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const UserData:CreateUserDto = request.body;
        //console.log(UserData);
        try {
            const created = await this.authService.register(UserData);
            const result = await  this.emailConfirmationService.sendVerificationLink(created.email);
            response.status(201).send(created);
   
        } catch (error) {
           
            next(error);
        }
    }

    

    public  logIn = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        
        const login:logInDto=request.body;
        
        try {
            const {token,optionsCookie,user} = await this.authService.logIn(login);
            // response.setHeader('set-cookie', [cookie]);//?
            response.cookie("Authorization",token,optionsCookie);
            response.status(200).send(user);


        } catch (error) {
            next(error);
        }
        
    }

    public  infos = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        
        const cookies = request.cookies;
        console.log(cookies);
        try {
            if (cookies && cookies.Authorization) {
            
            
                const secret = process.env.JWT_KEY;
                const verificationResponse = jwt.verify(cookies.Authorization, secret as string) as DataStoredInToken;
                const id = verificationResponse._id;
                let user = await this.userService.getUserById(Number(id));
                user.password="";
                response.status(200).send(user);    
            }
            else{
                next (new AuthenticationTokenMissingException());
            }

        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
        
    }

    public  logOut = async(request: express.Request, response: express.Response)=>{
        
        try {
            const result = await this.authService.logOut()
            response.setHeader('Set-Cookie', [result]);
            response.status(200).send();
        } catch (error) {
            console.log(error);     
        }
        
        
    }

    public forgotPassword =  async(request: express.Request, response: express.Response,next: express.NextFunction)=>{

        const forgotData:ForgotPasswordDto = request.body;
        try {
        
            const email = await this.resetPasswordService.checkEmail(forgotData.email); 
            const result = await this.resetPasswordService.sendResetLink(email);
            console.log(result);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
}

