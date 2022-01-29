import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Game} from "./Game";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 64})
    name: string

    @Column({
        type: 'varchar',
        length: 64
    })
    slug: string

    games: Game[]
}
