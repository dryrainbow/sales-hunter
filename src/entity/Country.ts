import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {stores} from "../sources/nintendo/stores";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 64})
    name: string

    @Column({type: "varchar", length: 32})
    code: keyof typeof stores

    @Column({type: "varchar", length: 32})
    defaultCurrency: string
}
