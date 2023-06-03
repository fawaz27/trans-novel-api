
import {NextFunction, Response ,Request} from 'express';
import ForbiddenException from '../exceptions/ForbiddenException';
import RequestWithUser from '../interfaces/requestWithUser.interface';


async function adminMiddleware(request: RequestWithUser, response: Response, next: NextFunction)
{
    // console.log(request.user.role);
    
   if(request.user?.role!="admin")
        next(new ForbiddenException('Sorry only the admin has sufficient rights to access this resource.')) ;
    next();
}


export default adminMiddleware as unknown as (req:Request,res:Response,net:NextFunction)=>{} ;