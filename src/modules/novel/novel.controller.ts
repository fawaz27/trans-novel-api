import express, { Request,Response, Router ,NextFunction} from 'express';
import adminMiddleware from '../../middlewares/adminMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validationMiddleware from '../../middlewares/validationMiddleware';
import SourcesFactory from '../sources/sourceFactory';
import SourcesService from '../sources/sources.service';
import CreateNovelDto from './novel.dto';
import { NovelService } from './novel.service';

export class NovelController{

    public path:string = '/novels/:source';
    public router:Router = express.Router();
    private novelService: NovelService
    constructor(){      
        this.novelService= new NovelService();
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/novel-list/latest`,this.getNovelsLatest);
        this.router.get(`${this.path}/novel-list/completed`,this.getNovelsCompleted);
        this.router.get(`${this.path}/novel-list/popular`,this.getNovelsPopular);
        this.router.get(`${this.path}/search/keyword`,this.searchWithKeyword);
        this.router.get(`${this.path}/genre-list`,this.searchWithGenre);
        this.router.get(`${this.path}/novel`,this.getNovelWithUrl);
        this.router.get(`${this.path}/chapter`,this.getChapterContent);
        this.router.get(`${this.path}/genres`,this.getGenres);
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

    public async getGenres(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        
        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl);
            const result = await sourceService.getGenres();
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    public async getNovelsLatest(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { page=1 } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);

            const result = await sourceService.getNovelsLatest(Number(page));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    public async getNovelsCompleted(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { page=1 } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl);
            
            const result = await sourceService.getNovelsCompleted(Number(page));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    public async getNovelsPopular(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { page=1 } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl);
            
            const result = await sourceService.getNovelsPopular(Number(page));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }
    
    public async searchWithKeyword(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { keyword,page=1 } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl); 
            const result = await sourceService.searchWithKeyword(String(keyword),Number(page));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    public async searchWithGenre(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { genre,page=1 } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl); 
            const result = await sourceService.searchWithGenre(String(genre),Number(page));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    public async getNovelWithUrl(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { url,page=1 } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl); 
            const result = await sourceService.getNovel(String(url),Number(page));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    public async getChapterContent(req: Request, res: Response,next:NextFunction) {

        const { source } = req.params;
        const { url } = req.query;

        try {
          
            const sourceService = SourcesFactory.createSourceService(source);
            console.log('Source url : '+sourceService.baseUrl); 
            const result = await sourceService.getContentChapter(String(url));
            res.status(200).send(result);

        } catch (error) {
          next(error);
        }
    }

    // public  addNovelToLibrary = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

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

    // public  getNovelsOfUser = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

    //     const userId = Number(request.query.userId);
        
    //     try {
    //         const result = await this.novelService.getNovelsOfUser(userId);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  getNovelsOfLirbrary = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

    //     const id_library = Number(request.query.id_library);

    //     try {
    //         const result = await this.novelService.getNovelsOfLirbrary(id_library);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  getNovelbyId = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    //     const id = Number(request.params.id);
    //     try {
    //         const result = await this.novelService.getNovelbyId(id);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  updateNovel = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
    //     const id = Number(request.params.id);
    //     const novelData:CreateNovelDto = request.body;
    //     try {
    //         const result = await this.novelService.updateNovel(id,novelData);
    //         response.status(201).send(result);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // public  deleteNovel = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

    //     const id = Number(request.params.id);
    //     try {
    //         const result = await this.novelService.deleteNovel(id);
    //         response.status(201).send(`Novel with ${result} has been deleted`);
    //     } catch (error) {
    //         next(error);
    //     }
    // }


}