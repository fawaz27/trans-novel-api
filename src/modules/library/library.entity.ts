import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Novel } from "../novel/novel.entity";
import { User } from "../user/user.entity";


@Entity()
export class Library {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(()=> User, (user)=>user.library)
    public user : User;

    @OneToMany(()=>Novel,(novel)=>novel.library)
    public novels : Novel[];
}