import {Router ,NextFunction, Request, Response } from 'express';

import authMiddleware from '../../middlewares/authMiddleware';
import validationMiddleware from '../../middlewares/validationMiddleware';
import adminMiddleware from '../../middlewares/adminMiddleware';
import { UserService } from './user.service';
import CreateUserDto from './user.dto';

export class UserController{

    public path = '/users';
    public router = Router();
    private userService:UserService;

    constructor(){
        this.userService = new UserService();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router
            .get(
                this.path,
                authMiddleware, 
                adminMiddleware,
                this.getAllUsers
                );
        
        this.router
            .all(
                `${this.path}/*`,
                authMiddleware ,
                adminMiddleware )
            .put(`${this.path}/:id`,validationMiddleware(CreateUserDto),this.updateUser)
            .delete(`${this.path}/:id`,this.deleteUser);

    }

    

    public getAllUsers = async(request: Request, response: Response, next: NextFunction)=>{
        
        try {
            const result = await this.userService.getAllUsers();
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public updateUser = async(request: Request, response: Response, next: NextFunction)=>{
        const id = Number(request.params.id) ;
        const userData:CreateUserDto = request.body;
        try {
            const updated = await this.userService.updateUser(id,userData);
            response.status(201).send(updated);
        } catch (error) {
            next(error);
        }
    }

    public deleteUser = async(request: Request, response: Response, next: NextFunction)=>{
        const id = Number(request.params.id);
        try {
            const deleted = await this.userService.deleteUser(id);
            response.status(201).send(deleted);
        } catch (error) {
            next(error);
        }
    }




}