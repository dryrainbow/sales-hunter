import { EntityRepository, getCustomRepository, Like, Repository } from "typeorm";
import { Game } from "../entity/Game";
import { NintendoOfficialGameResult } from "../types/game";
import { Platform } from "../entity/Platform";
import { PlatformsSlugs } from "../types/platform";
import { CategoryRepository } from "./CategoryRepository";
import { logQuery } from "../utils/database";

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {

    // TODO: написать 1 метод для добавления нормализированных игр
    async saveOrUpdateFromNintendo(game: NintendoOfficialGameResult) {
        const platformRepository = this.manager.getRepository(Platform)
        const categoriesRepository = getCustomRepository(CategoryRepository)
        const nintendoSwitchPlatform = await platformRepository.findOne({ where: { slug: PlatformsSlugs.nintendo_switch } })

        const exitingGame = await this.findOne({
            where: {
                platform: nintendoSwitchPlatform,
                name: game.title
            }
        })

        if (exitingGame) {
            exitingGame.image_url = game.image_url
            exitingGame.updatedAt = new Date()
            await this.save(exitingGame)
            return exitingGame
        }

        const newGame = new Game()
        if (game.game_categories_txt && game.pretty_game_categories_txt && game.game_categories_txt.length === game.game_categories_txt.length) {
            newGame.categories = await categoriesRepository.createOrUpdateCategories(
                game.game_categories_txt.reduce(
                    (acc, slug, index) => {
                        return {
                            ...acc,
                            [slug]: game.pretty_game_categories_txt[index]
                        }
                    }, {}))
        } else {
            newGame.categories = []
        }
        newGame.name = game.title
        newGame.platform = nintendoSwitchPlatform
        newGame.createdAt = new Date()
        newGame.updatedAt = newGame.createdAt
        newGame.description = game.product_catalog_description_s
        newGame.image_url = game.image_url
        await this.save(newGame)
        return newGame
    }

    async searchGame(name: string) {
        return await logQuery(this.createQueryBuilder()
            .where("UPPER(name) like UPPER(:name)", {name: `%${name}%`}))
            .getMany()
    }
}
