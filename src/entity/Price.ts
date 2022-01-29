import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Country} from "./Country";
import {JoinColumn} from "typeorm/browser";
import {Game} from "./Game";
import {Shop} from "./Shop";

@Entity()
export class Price {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type=>Game, game => game.prices)
    game: Game

    @ManyToOne(type => Country,{nullable: true})
    country: Country

    @Column({type: "float"})
    value: number

    @Column({type: "timestamp without time zone"})
    dateFrom: string

    @Column({type: "timestamp without time zone"})
    dateTo: string

    @ManyToOne(type=>Shop, shop => shop.categories)
    shop: Shop

    @Column({type: "text"})
    link: string
}
