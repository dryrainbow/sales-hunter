import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import {Platform} from "../entity/Platform";

export class Platforms1640510121883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const qb = getConnection('seed').createQueryBuilder()
        await qb
            .insert()
            .into('platform')
            .values([
                {id: 1, name: 'Nintendo Switch', slug: "nintendo_switch"},
                {id: 2, name: 'PlayStation 4/5', slug: "playstation_4_5"},
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
