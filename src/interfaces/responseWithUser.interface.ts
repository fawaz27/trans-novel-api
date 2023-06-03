import { Response } from 'express';
import { User } from '../modules/user/user.entity';


interface ResponseWithUser extends Response {
    user:User;
}
export default ResponseWithUser;