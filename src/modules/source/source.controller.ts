import express, { NextFunction, Request, Response } from 'express';
import CreateSourceDto from './source.dto';
import authMiddleware from '../../middlewares/authMiddleware';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { SourceService } from './source.service';
import adminMiddleware from '../../middlewares/adminMiddleware';

export class SourceController{

    public path = '/sources';
    public router = express.Router();
    private sourceService:SourceService;

    constructor(){
        this.sourceService = new SourceService();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router
            .all(this.path,authMiddleware )
            .get(this.path,this.getAllSources)
            .post(
                this.path,
                adminMiddleware ,
                validationMiddleware(CreateSourceDto),this.addSource);
        
        this.router
            .all(
                `${this.path}/*`,
                authMiddleware ,
                adminMiddleware )
            .put(`${this.path}/:id`,validationMiddleware(CreateSourceDto),this.updateSource)
            .delete(`${this.path}/:id`,this.deleteSource);

    }

    public addSource = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const sourceData:CreateSourceDto = request.body;
        try {
            const created = await this.sourceService.addSource(sourceData);
            response.status(201).send(created);
        } catch (error) {
            next(error);
        }
    }

    public getAllSources = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        
        try {
            const result = await this.sourceService.getAllSources();
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }


    public updateSource = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const id = Number(request.params.id) ;
        const sourceData:CreateSourceDto = request.body;
        try {
            const updated = await this.sourceService.updateSource(id,sourceData);
            response.status(201).send(updated);
        } catch (error) {
            next(error);
        }
    }

    public deleteSource = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const id = Number(request.params.id);
        try {
            const deleted = await this.sourceService.deleteSource(id);
            response.status(201).send(`Source with ${deleted} has been deleted`);
        } catch (error) {
            next(error);
        }
    }




}