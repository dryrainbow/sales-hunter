import {PlatformDepCrawler} from "./PlatformDepCrawler";
import {NintendoOfficialShop} from "../../sources/nintendo/api";
import {getConnection} from "typeorm";
import {GameRepository} from "../../repository/GameRepository";

export class NintendoSwitch implements PlatformDepCrawler {
    async crawl() {
        let newGames = []
        const connection = getConnection()
        const gameRepository = connection.getCustomRepository(GameRepository)
        const nintendoOfficialApi = new NintendoOfficialShop()
        console.log('PENDING REQUEST TO NINTENDO ESHOP')
        const games = await nintendoOfficialApi.parse()
        console.log(games[0])
        console.log('START SAVING TO DATABASE')
        for (let game of games) {
            await gameRepository.saveOrUpdateFromNintendo(game)
        }

        return {count: games.length}
    }
}
