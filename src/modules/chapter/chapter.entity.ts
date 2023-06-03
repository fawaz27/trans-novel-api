

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Novel } from "../novel/novel.entity";

@Entity()
export class Chapter{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 200 })
    public name : string;

    @Column({ type: 'varchar', length: 200 })
    public link : string; 

    @Column("bigint")
    public num : string;

    @Column({ type: 'varchar', length: 200 })
    public infos : string;

    @ManyToOne(()=>Novel,(novel)=>novel.chapters)
    public novel :Novel;

}