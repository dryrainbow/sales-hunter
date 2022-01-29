import { EntityRepository, In, Repository } from "typeorm";
import { Country } from "../entity/Country";
import { Game } from "../entity/Game";
import { Price } from "../entity/Price";
import { Shop } from "../entity/Shop";

@EntityRepository(Price)
export class CategoryRepository extends Repository<Price> {
    async addPrice(price: PriceDto) { }
    async getPrices(game: Game, country?: Country, shop?: Shop) {
        return await this.find({
            where: {
                game,
                country,
                shop
            }
        })
    }
}

export type PriceDto = {
    game: Game
    country: Country
    shop: Shop
    value: number
    link: string
    dateFrom?: string
    dateTo?: string
}
