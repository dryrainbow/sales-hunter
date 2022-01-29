import {Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Country} from "./Country";
import {Category} from "./Category";
import {Source} from "./Source";

@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 128})
    name: string

    @Column({type: "varchar", length: 128})
    link: string

    @ManyToMany(type=>Country)
    @JoinColumn()
    countries: Country[]

    @ManyToMany(type=>Category)
    categories: Category[]

    sources: Source[]

}
