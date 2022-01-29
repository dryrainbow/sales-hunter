import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import {stores} from "../sources/nintendo/stores";

export class Countries1640513240256 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const qb = getConnection('seed').createQueryBuilder()
        const data = Object.keys(stores).map((key: keyof typeof stores, index)=>{
            return {
                id: index + 1,
                name: stores[key].name,
                code: key,
                defaultCurrency: stores[key].defaultCurrency

            }
        })
        await qb
            .insert()
            .into('country')
            .values(data)
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
