import { Repository } from "typeorm";
import { AppDataSource } from "../../database/AppDataSource";
import CreateNovelDto from "./novel.dto";
import InternalErrorException from "../../exceptions/InternalErrorException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Novel } from "./novel.entity";
import { LibraryService } from "../library/library.service";
import { SourceService } from "../source/source.service";
import { UserService } from "../user/user.service";
import { Library } from "../library/library.entity";


export class NovelService{

    private novelRepository:Repository<Novel> ;
    private sourceService : SourceService;

    constructor(){
        this.novelRepository = AppDataSource.getRepository(Novel);
        this.sourceService = new SourceService();

    }


   

    public async getNovelsOfLibrary(id_library:number){

        const novels = await this.novelRepository
                        .createQueryBuilder("novel")
                        .leftJoinAndSelect("novel.source","source")
                        .leftJoin("novel.library","library")
                        .where("library.id = :id_library",{id_library})
                        .getMany();

        if(novels)
            return novels;
        
    }

    public async getNovelbyId(id_novel:number){

        const novel = await this.novelRepository
                        .createQueryBuilder("novel")
                        .leftJoinAndSelect("novel.source","source")
                        .leftJoinAndSelect("novel.library","library")
                        .where("novel.id = :id_novel",{id_novel})
                        .getOne();
                        
        if(novel)
            return novel;
        else
            throw new NotFoundException('Novel not found.');   
            
    }

    public async addNovel(novel:CreateNovelDto, library : Library){
        const source = await this.sourceService.getSourceByName(novel.source);
        let newNovel =  new Novel();
        newNovel.source = source;
        newNovel.library = library;

        return await this.novelRepository.save(newNovel);

    }

    public async updateNovel(id_novel:number,novel:CreateNovelDto){

        const ifExist = await this.novelRepository
                            .createQueryBuilder("novel")
                            .leftJoinAndSelect("novel.source","source")
                            .leftJoinAndSelect("novel.library","library")
                            .where("novel.id = :id_novel",{id_novel})
                            .getOne();
        
        if(ifExist){

            const updatedNovel = this.novelRepository.update(id_novel,{name:novel.name});

            if (updatedNovel) 
                return updatedNovel;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Novel not found.');
        
    } 


    public async deleteNovel(id_novel:number){

        const novelToDelete = await this.novelRepository
                            .createQueryBuilder("novel")
                            .where("novel.id = :id_novel",{id_novel})
                            .getOne();
        
        if(novelToDelete){
            const result = await this.novelRepository.remove(novelToDelete);
    
            if(result)
                return id_novel;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Novel not found.');
    }

}