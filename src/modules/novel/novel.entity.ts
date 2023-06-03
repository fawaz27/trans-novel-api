

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "../chapter/chapter.entity";
import { Library } from "../library/library.entity";
import { Source } from "../source/source.entity";

@Entity()
export class Novel{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 200 })
    public name : string;

    @Column({ type: 'varchar', length: 200 })
    public url : string;

    @OneToMany(()=> Chapter, (chap)=>chap.novel)
    public chapters : Chapter[]
    
    @ManyToOne(()=>Source,(source)=>source.novels)
    public source: Source;

    @ManyToOne(()=>Library,(library)=>library.novels)
    public library: Library;
    


}