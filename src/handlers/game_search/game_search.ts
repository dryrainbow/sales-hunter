import {getCustomRepository} from "typeorm";
import {GameRepository} from "../../repository/GameRepository";
import {Game} from "../../entity/Game";
import {Request, Response} from "express";

export function createGameSearchHandler(){
    return async (req: Request, res: Response) => {
        const {name} = req.query
        const gameRepository = getCustomRepository(GameRepository)
        let result: Game[] = []
        if (name) {
            result = await gameRepository.searchGame(name.toString())
            console.log(result)
        }
        res.json(result)
    }
}
