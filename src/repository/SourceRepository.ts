import { EntityRepository, In, Repository } from "typeorm";
import { Country } from "../entity/Country";
import { Game } from "../entity/Game";
import { Shop } from "../entity/Shop";
import {SourceLog} from "../entity/SourceLog";
import {Source} from "../entity/Source";
import {ISourceLogger, ISourceRepository} from "../interfaces";

@EntityRepository(Source)
export class SourceRepository extends Repository<Source> implements ISourceRepository{

    async get(name: string): Promise<Source> {
        return await this.findOne({
            where: {name}
        })
    }
}
