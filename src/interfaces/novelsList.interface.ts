import Novel from "./novel.interface";

interface NovelsList {
    novels: Novel[];
    last_page?:number;
}

export default NovelsList;