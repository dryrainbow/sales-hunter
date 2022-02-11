import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import {stores} from "../sources/nintendo/stores";

export class AddNewSource1643493729738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const qb = getConnection('seed').createQueryBuilder()
        await qb
            .insert()
            .into('platform')
            .values([
                {id: 1, name: 'Nintendo official shop', },
                {id: 2, name: 'PlayStation 4/5', slug: "playstation_4_5"},
            ])
            .execute()
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
