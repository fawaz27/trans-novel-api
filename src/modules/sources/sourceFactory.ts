import axiosLibrary from "../httpClient/axios";
import { NovelFullService } from "./novelfull.service";
import SourcesService from "./sources.service";



class SourcesFactory {

    static createSourceService(source: string): SourcesService {
        
        if (source === 'novelfull') {
            const service = new NovelFullService("novelfull","https://novelfull.com",axiosLibrary);
            return service;
        } 
        else {
            throw new Error(`Unknown source ${source}`);
        }
    }

}
  
  
export default SourcesFactory;