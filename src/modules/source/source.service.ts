import { Repository } from "typeorm";
import { AppDataSource } from "../../database/AppDataSource";
import CreateSourceDto from "./source.dto";
import InternalErrorException from "../../exceptions/InternalErrorException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Source } from "./source.entity";
import ConflictException from "../../exceptions/ConflictException";


export class SourceService{

    private sourceRepository:Repository<Source> ;

    constructor(){
        this.sourceRepository = AppDataSource.getRepository(Source);
    }

    public async addSource(source:CreateSourceDto){
        
        const alreadyExist = await this.sourceRepository.findOne({where:{name:source.name}});
        if(alreadyExist)
            throw new ConflictException(`Source with name ${source.name} already exists.`);

        const newSource =  this.sourceRepository.create(source);
        const result = await this.sourceRepository.save(newSource);

        if(result)
            return result;
        else
            throw new InternalErrorException();

    }

    public async getAllSources(){

        const sources  = await this.sourceRepository.find();
        
        if(sources)
            return sources;
        
    }

    public async getSourceById(id:number){

        const source  = await this.sourceRepository.findOne({where:{id:id}});
        
        if(source)
            return source;
        else
            throw new NotFoundException('Source not found.');
    }

    public async getSourceByName(name:string){

        const source  = await this.sourceRepository.findOne({where:{name:name}});
        
        if(source)
            return source;
        else
            throw new NotFoundException('Source not found.');
    }

    public async updateSource(id:number,source:CreateSourceDto){

        const validId = await this.sourceRepository.findOne({where:{id:id}});

        if(validId){
            const updatedSource = await this.sourceRepository.update(id,source);

            if (updatedSource) 
                return updatedSource;
            else
                throw new InternalErrorException(); 
        }
        else    
            throw new NotFoundException('Source not found.')

    }

    public async deleteSource(id:number){

        const sourceToDelete  = await this.sourceRepository.findOne({where:{id:id}});

        if(sourceToDelete){
            const result = await this.sourceRepository.remove(sourceToDelete);
            
            if(result)
                return id;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Source not found.')
    }

}