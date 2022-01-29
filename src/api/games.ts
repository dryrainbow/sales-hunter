import * as express from 'express'
import { getCustomRepository } from 'typeorm'
import { Game } from '../entity/Game'
import { GameRepository } from '../repository/GameRepository'

const router = express.Router()

router.get('/search', async (req, res) => {
    const { name } = req.query
    const gameRepository = getCustomRepository(GameRepository)
    let result: Game[] = []
    if (name) {
        result =  await gameRepository.searchGame(name.toString())
        console.log(result)
    }
    res.json(result)
})

export default router