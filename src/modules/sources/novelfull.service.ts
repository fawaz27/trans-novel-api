import { Cheerio, load } from "cheerio";
import Chapter from "../../interfaces/chapter.interface";
import Content from "../../interfaces/content.interface";
import { HttpLibrary } from "../../interfaces/httpLibrary.interface";
import Novel from "../../interfaces/novel.interface";
import SourcesService from "./sources.service";
import NovelsList from "../../interfaces/novelsList.interface";


export class NovelFullService implements SourcesService{

    name: String;
    baseUrl : String;
    http: HttpLibrary;

    constructor(namesource: string, url: string, http: HttpLibrary) {
        this.name = namesource;
        this.baseUrl = url; 
        this.http = http; 
             
    }

    private async matchOthersParams(data:Novel[]) : Promise<Novel[]>{

        let result: Novel [] = [];

        await Promise.all(data.map(async (it) => {
            const infos  = await this.getInfos(it.url); 
            const image  = infos.find('img').attr('src') as string;
            const status = ((infos.find('.info')).find('div').eq(4)).find('a').text(); 

            it.status = status; 
            it.coverImageUrl = `${this.baseUrl}${image}`;
        }));
        console.log(data[0]);

        return data;
    }

    private async getInfos(link:string|undefined) :Promise<any>{


        try {
        const response = await this.http.get(`${this.baseUrl}${link}`, this.http.headers);
            const $ = load(response.data);
            const infos = $('.col-info-desc');    
            return infos;
        } catch (error) {
            console.error(`Error scraping novel: ${error}`);
            return '';
        }
        

    }

    async getNovelsLatest(page:number): Promise<NovelsList>{

        let novels: Novel[]=[];
        let novelsList: NovelsList={last_page:1,novels:[]};

        try {
            const url = 'latest-release-novel';
            const response = await this.http.get(`${this.baseUrl}/${url}?page=${page}`, this.http.headers);

            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",author:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novel.author = $(row).find('.author').text().trim();     
                novels.push(novel);
            
            });
            novels = await this.matchOthersParams(novels);
            novelsList.novels = novels;
            novelsList.last_page = Number($('li.last a').attr('data-page')) +1 ;
            if(Number.isNaN(novelsList.last_page))   
                novelsList.last_page = Number($('li.active a').last().attr('data-page')) +1 ;

            return novelsList;
        } catch (error) {
            console.error(`Error scraping novel: ${error}`);
            return novelsList;
        }
        
    };

    

    async getNovelsCompleted(page:number): Promise<NovelsList>{
        let novels: Novel[]=[];
        let novelsList: NovelsList={last_page:1,novels:[]};
        try {
            const url = 'completed-novel';
            const response = await this.http.get(`${this.baseUrl}/${url}?page=${page}`, this.http.headers);

            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",author:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novel.author = $(row).find('.author').text().trim(); 
                novels.push(novel);
            
            });
            novels = await this.matchOthersParams(novels);
            novelsList.novels = novels;
            novelsList.last_page = Number($('li.last a').attr('data-page')) +1 ;
            if(Number.isNaN(novelsList.last_page))   
                novelsList.last_page = Number($('li.active a').last().attr('data-page')) +1 ;

            return novelsList;
        } catch (error) {
            return novelsList;
        }
        
        
    };

    async getNovelsPopular(page:number): Promise<NovelsList>{
        let novels: Novel[]=[];
        let novelsList: NovelsList={last_page:1,novels:[]};
        try {
            const url = 'most-popular';
            const response = await this.http.get(`${this.baseUrl}/${url}?page=${page}`, this.http.headers);

            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",author:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novel.author = $(row).find('.author').text().trim(); 
                novels.push(novel);
            
            });
            novels = await this.matchOthersParams(novels);
            novelsList.novels = novels;
            novelsList.last_page = Number($('li.last a').attr('data-page')) +1 ;
            if(Number.isNaN(novelsList.last_page))   
                novelsList.last_page = Number($('li.active a').last().attr('data-page')) +1 ;

            return novelsList;
        } catch (error) {
            return novelsList;
        }
        
        
    };
    async searchWithKeyword(keyword:string,page:number): Promise<NovelsList>{
        let novels: Novel[]=[];
        let novelsList: NovelsList={last_page:1,novels:[]};
        try {
            const url = 'search?keyword=';
            const keywordPlus = keyword.replace(/\s+/g, "+");
            const response = await this.http.get(`${this.baseUrl}/${url}${keywordPlus}&page=${page}`, this.http.headers);
            console.log(`${this.baseUrl}/${url}?keyword=${keywordPlus}&page=${page}`);
            
            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novel.author = $(row).find('.author').text().trim(); 
                novels.push(novel);
            
            });
            novels = await this.matchOthersParams(novels);
            novelsList.novels = novels;
            novelsList.last_page = Number($('li.last a').attr('data-page')) +1 ;
            if(Number.isNaN(novelsList.last_page))   
                novelsList.last_page = Number($('li.active a').last().attr('data-page')) +1 ;

            return novelsList;
        } catch (error) {
            return novelsList;
        }
    };

    async searchWithGenre(genre:string,page:number): Promise<NovelsList>{
        let novels: Novel[]=[];
        let novelsList: NovelsList={last_page:1,novels:[]};
        try {
            const url = 'genre';
            const response = await this.http.get(`${this.baseUrl}/${url}/${genre}?page=${page}`, this.http.headers);
            console.log(`${this.baseUrl}/${url}/${genre}&page=${page}`);
            
            const $ = load(response.data);
            const listPage = $('.col-xs-12.col-sm-12.col-md-9.col-truyen-main.archive');
            if (!listPage) {
                throw new Error(`Error while parsing the HTML : listPage not found`);
            }
            const rows = listPage.find('.row');
            
            rows.each((i, row) =>  {
                let novel :Novel= {title:"",url:""};
                novel.title = $(row).find('.col-xs-7 a').text();
                novel.url =  $(row).find('.col-xs-7 a').attr('href') as string;
                novel.author = $(row).find('.author').text().trim(); 
                novels.push(novel);
            
            });
            novels = await this.matchOthersParams(novels);
            novelsList.novels = novels;
            novelsList.last_page = Number($('li.last a').attr('data-page')) +1 ;
            if(Number.isNaN(novelsList.last_page))   
                novelsList.last_page = Number($('li.active a').last().attr('data-page')) +1 ;

            return novelsList;
        } catch (error) {
            return novelsList;
        }
    };
    async getNovel(novelUrl: string,page:number) : Promise<Novel>{

        let novel: Novel = {title:"",url:""}; 

        try {
            const response = await this.http.get(`${this.baseUrl}/${novelUrl}?page=${page}`, this.http.headers);
            const $ = load(response.data);
            const infos = $('.col-info-desc');    

            if(infos.find('img').attr('src'))
                novel.coverImageUrl = `${this.baseUrl}${infos.find('img').attr('src')}`;
            novel.author = infos.find('.info a').first().text();
            novel.title = infos.find('.title').first().text();
            const di = (infos.find('.info')).find('div').eq(2);
            novel.genres = di.find('a').map((i, el) => $(el).text()).get();
            novel.description = infos.find('.desc-text p').text();
            novel.status = ((infos.find('.info')).find('div').eq(4)).find('a').text();
            novel.last_page = Number($('li.last a').attr('data-page')) +1 ;
            
            if(Number.isNaN(novel.last_page))   
                novel.last_page = Number($('li.active a').last().attr('data-page')) +1 ;
            
            const listChapter = $('div#list-chapter.col-xs-12');
            const rows = listChapter.find('.row a');
            const result: Chapter[] = [];
            rows.each((i, row) => {
                const url = $(row).attr('href') as string;
                const title = $(row).text();
                result.push({ url, title });
            });
            novel.chapters = result;
            
            return novel;
        } catch (error) {
            return novel;
        }
    };

    async getContentChapter(chapterUrl: string) : Promise<Content>{
        let content: Content = {title:"",titleNovel:"",content:[""],prevUrl:"",nextUrl:""};
        try {
            const response = await this.http.get(`${this.baseUrl}${chapterUrl}`, this.http.headers);

            const $ = load(response.data);
            const Chapter = $('.row');
            content.titleNovel = Chapter.find('a.truyen-title').first().text();
            content.title = Chapter.find('a.chapter-title').first().text();
            content.nextUrl = Chapter.find('a#next_chap').attr('href');
            content.prevUrl = Chapter.find('a#prev_chap').attr('href');
            const paragraphs = Chapter.find('p');
            content.content = paragraphs.map((i, el) => $(el).text()).get();
            return content;
        } catch (error) {
            return content;
        }
    };
    async getGenres() : Promise<String[]>{
        try {
            const response = await this.http.get(`${this.baseUrl}/genre/Harem`, this.http.headers);
            let j = 0;
            const $ = load(response.data);
            const data = $('.visible-md-block.visible-lg-block.col-md-3.text-center.col-truyen-side');
            const genres: string[] = [];
            $('.col-xs-6 a').each((index, element) => {
                const genre = $(element).text().trim();
                j++
                genres.push(genre);
            });
            return genres;
        } catch (error) {
            return [];
        }
    };
}