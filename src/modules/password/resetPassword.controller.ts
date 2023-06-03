import express, { Router } from 'express'
import resetPasswordDto from './resetPassword.dto';
import validationMiddleware from '../../middlewares/validationMiddleware';
import ResetPasswordService from './resetPassword.service';

export class ResetPasswordController{

    public path:string = '/reset-password';
    public router:Router = express.Router();
    private resetPasswordService:ResetPasswordService;

    constructor(){      
        this.resetPasswordService= new ResetPasswordService;
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post(`${this.path}`,validationMiddleware(resetPasswordDto),this.reset);
    }

    public reset = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const resetData: resetPasswordDto = request.body;
        try {
            const email = await this.resetPasswordService.decodeResetToken(resetData.token);
            const result = await this.resetPasswordService.resetPassword(email,resetData.password);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
}
