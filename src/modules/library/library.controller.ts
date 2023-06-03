import {Request,Response, Router ,NextFunction} from 'express';
import adminMiddleware from '../../middlewares/adminMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { LibraryService } from './library.service';


export class NovelController{

    public path:string = '/users/:userId/library';
    public router:Router = Router();
    private libraryService:LibraryService
    constructor(){      
        this.libraryService= new LibraryService();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        
        // this.router
        //     .get(
        //         `${this.path}User`,
        //         authMiddleware ,
        //         this.getNovelsOfUser)
        //     .get(
        //         `${this.path}Library`,
        //         authMiddleware ,
        //         adminMiddleware ,
        //         this.getNovelsOfLirbrary
        //         )
        //     .post(this.path,validationMiddleware(CreateNovelDto),this.addNovelToLibrary)
        
        // this.router
        //     .all(`${this.path}/*`,authMiddleware )
        //     .get(`${this.path}/:id`,this.getNovelbyId)
        //     .put(`${this.path}/:id`,validationMiddleware(CreateNovelDto),this.updateNovel)
        //     .delete(`${this.path}/:id`,this.deleteNovel)
    }

    // public  addNovelToLibraryUser = async(request: Request, response: Response, next: NextFunction)=>{

    //     const id_library = Number(request.query.id_library);
    //     const id_source = Number(request.query.id_source);
    //     const novelData:CreateNovelDto = request.body;

    //     try {
    //         const result = await this.novelService.addNovelToLibrary(id_library,id_source,novelData);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    public  getLibraryOfUser = async(request: Request, response: Response, next: NextFunction)=>{

        const userId = Number(request.query.userId);
        
        try {
            const result = await this.libraryService.getAllNovelsLibraryOfUser(userId);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }

    // public  getNovelsOfLirbrary = async(request: Request, response: Response, next: NextFunction)=>{

    //     const id_library = Number(request.query.id_library);

    //     try {
    //         const result = await this.novelService.getNovelsOfLirbrary(id_library);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  getNovelbyId = async(request: Request, response: Response, next: NextFunction)=>{
    //     const id = Number(request.params.id);
    //     try {
    //         const result = await this.novelService.getNovelbyId(id);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  updateNovel = async(request: Request, response: Response, next: NextFunction)=>{
    //     const id = Number(request.params.id);
    //     const novelData:CreateNovelDto = request.body;
    //     try {
    //         const result = await this.novelService.updateNovel(id,novelData);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  deleteNovel = async(request: Request, response: Response, next: NextFunction)=>{

    //     const id = Number(request.params.id);
    //     try {
    //         const result = await this.novelService.deleteNovel(id);
    //         response.status(201).send(`Novel with ${result} has been deleted`);
    //     } catch (error) {
    //         next(error);
    //     }
    // }


}