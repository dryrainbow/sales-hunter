import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Game} from "./Game";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string

    @ManyToMany(()=>Game)
    @JoinTable({name: "users_games"})
    games: Game[]
}
