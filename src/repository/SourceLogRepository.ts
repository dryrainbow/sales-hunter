import { EntityRepository, In, Repository } from "typeorm";
import { Country } from "../entity/Country";
import { Game } from "../entity/Game";
import { Shop } from "../entity/Shop";
import {SourceLog} from "../entity/SourceLog";
import {Source} from "../entity/Source";
import {ISourceLogger} from "../interfaces";

@EntityRepository(SourceLog)
export class SourceLogRepository extends Repository<SourceLog> implements ISourceLogger{
    async saveSourceRequest(source: Source, url: string, req: string, res: string) {
        const log = new SourceLog()
        log.source = source
        log.request = req
        log.response = res
        log.url = url

        await this.save(log)
    }
}
