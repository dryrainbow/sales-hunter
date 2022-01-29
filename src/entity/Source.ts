import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Shop} from "./Shop";
import {SourceLog} from "./SourceLog";

@Entity()
export class Source {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 64
    })
    name: string

    @ManyToMany(()=>Shop, shop => shop.sources)
    @JoinTable({name: "source_shop"})
    shops: Shop[]

    sourceLogs: SourceLog[]
}
