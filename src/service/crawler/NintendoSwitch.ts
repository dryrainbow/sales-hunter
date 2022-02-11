import {ICrawler, IGameRepository, ISourceFetcher, ISourceLogger} from "../../interfaces";
import {Game} from "../../entity/Game";

export class NintendoSwitch implements ICrawler {
    private sourceFetcher: ISourceFetcher
    private gameRep: IGameRepository
    private readonly sourceLogger: ISourceLogger

    constructor(sourceFetcher: ISourceFetcher, gameRep: IGameRepository, sourceLogger: ISourceLogger) {
        this.gameRep = gameRep
        this.sourceLogger = sourceLogger;
        this.sourceFetcher = sourceFetcher
    }

    async crawl() {
        const games = await this.sourceFetcher.parse(this.sourceLogger)
        for (let game of games) {
            await this.gameRep.saveOrUpdateFromNintendo(game)
        }
        return {count: games.length}
    }

    private async parsePrices(games: Game[]) {}
}
