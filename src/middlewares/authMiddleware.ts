import  jwt from 'jsonwebtoken';
import {NextFunction, Response ,Request} from 'express';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface'
import { AppDataSource } from '../database/AppDataSource'
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { User } from '../modules/user/user.entity';

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction)
{
   
    const cookies = request.cookies;
    console.log(cookies);
    
    if (cookies && cookies.Authorization) {
        
        
        const secret = process.env.JWT_KEY;
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret as string) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await  AppDataSource.getRepository(User).findOneBy({id: Number(id)});
            // console.log(user?.email)
            if (user) {
                request.user = user;
                next();
            }
            else
                next(new WrongAuthenticationTokenException());      
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
        
    } else {
        next (new AuthenticationTokenMissingException());
    }
    
}


export default authMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{};