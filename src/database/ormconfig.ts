import { DataSourceOptions } from 'typeorm';
import { Chapter } from '../modules/chapter/chapter.entity';
import { Library } from '../modules/library/library.entity';
import { Novel } from '../modules/novel/novel.entity';
import { Source } from '../modules/source/source.entity';
import { User } from '../modules/user/user.entity';

const config: DataSourceOptions = {
    type: 'postgres',
    url: process.env.URL_DB,
    // host: process.env.HOST,
    // port: Number(process.env.PORT_DB),
    // username: process.env.USERNAME_DB,
    // password: process.env.PASSWORD_DB,
    // database: process.env.NAME_DB,
    entities: [User,Novel,Chapter,Source,Library],
    synchronize: true,
    
};
 
export default config;