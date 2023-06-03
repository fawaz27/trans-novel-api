import {NextFunction, Response} from 'express';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import RequestWithUser from "../interfaces/requestWithUser.interface";


async function emailConfirmationMiddleware(request: RequestWithUser, response: Response, next: NextFunction){

    if(!request.user?.isEmailConfirmed)
        next(new UnauthorizedException('Confirm your email first')) ;
    next();
}
