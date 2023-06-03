import Chapter from "../../interfaces/chapter.interface";
import Content from "../../interfaces/content.interface";
import { HttpLibrary } from "../../interfaces/httpLibrary.interface";
import Novel from "../../interfaces/novel.interface";
import NovelsList from "../../interfaces/novelsList.interface";


interface SourcesService{

    readonly baseUrl:String;
    readonly name:String;
    readonly http: HttpLibrary;
    
    
    getNovelsLatest(page:number): Promise<NovelsList>;
    getNovelsCompleted(page:number): Promise<NovelsList>;
    getNovelsPopular(page:number): Promise<NovelsList>;
    searchWithKeyword(keyword:string,page:number): Promise<NovelsList>;
    searchWithGenre(genre:string,page:number): Promise<NovelsList>;
    getNovel(novelUrl: string,page:number) : Promise<Novel>;
    // getListChapterNovel(novelUrl: string) : Promise<Chapter[]>;
    getContentChapter(chapterUrl: string) : Promise<Content>;
    getGenres() : Promise<String[]>;

};

export default SourcesService;