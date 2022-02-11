import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Source} from "./Source";

@Entity()
export class SourceLog {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'text',
    })
    url: string

    @Column({
        type: 'json',
    })
    request: string

    @Column({
        type: "json"
    })
    response: string



    @ManyToOne(()=>Source, source => source.sourceLogs)
    source: Source
}
