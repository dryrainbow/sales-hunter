import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";
import {Price} from "./Price";
import {Platform} from "./Platform";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(type => Category, cat => cat.games)
    @JoinTable({name: "games_categories"})
    categories: Category[]

    @Column({type: "varchar", length: 256})
    name: string

    @Column({type: "text", nullable: true})
    description: string

    @Column({type: "text", nullable: true})
    image_url: string

    @Column({type: "timestamp without time zone", nullable: true})
    releasedAt: Date

    @Column({type: "timestamp without time zone"})
    createdAt: Date

    @Column({type: "timestamp without time zone"})
    updatedAt: Date

    @Column({type: "json", default: {}, name: "source_meta"})
    sourceMeta: object

    @ManyToOne(type => Platform, platform => platform.games)
    platform: Platform

    prices: Price[]
}
