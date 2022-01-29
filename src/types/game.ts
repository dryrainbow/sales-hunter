import {ArrayElement} from "./utils";
import {getGamesEurope} from "nintendo-switch-eshop";

export type NintendoOfficialGameResult = ArrayElement<Awaited<ReturnType<typeof getGamesEurope>>> & {
    price_regular_f: number,
    price_sorting_f: number,
    price_lowest_f: number,
    price_discount_percentage_f: number,
    price_has_discount_b: boolean,
    pretty_game_categories_txt: string[],
    product_catalog_description_s: string
}
