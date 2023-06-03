import Chapter from "./chapter.interface";

interface Novel {

    title: string;
    author?: string;
    url:string;
    coverImageUrl?: string;
    description?: string;
    genres?: string[];
    chapters?: Chapter[];
    status?:string
    last_page?:number;
  }

export default Novel;