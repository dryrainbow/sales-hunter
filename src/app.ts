import * as dotenv from 'dotenv'
import * as express from 'express'
import {createConnection} from "typeorm";
import {NintendoOfficialShop} from "./sources/nintendo/api";
import {NintendoSwitch} from "./service/crawler/NintendoSwitch";
import {GameRepository} from "./repository/GameRepository";
import {SourceRepository} from "./repository/SourceRepository";
import {SOURCE_NAMES} from "./constants/sources";
import {SourceLogRepository} from "./repository/SourceLogRepository";
import {createGameSearchHandler} from "./handlers/game_search/game_search";
import {createCrawlerNintendoHandler} from "./handlers/crawler_nintendo/crawler_nintendo";
import {TaskManager} from "./service/task_manager/TaskManager";
import {Cache} from "./service/cache/cache";
import {TASKS} from "./service/task_manager/tasks";

require('reflect-metadata')

dotenv.config()
import ormconfig from "../ormconfig";
import {crawlerInfoHandler} from "./handlers/crawler_info/crawler_info";



function run() {
    const app = express()

    createConnection(ormconfig[0]).then(async (connection)=>{
        // Repositories
        const gameRepository = connection.getCustomRepository(GameRepository)
        const sourceRepository = connection.getCustomRepository(SourceRepository)
        const sourceLogRepository = connection.getCustomRepository(SourceLogRepository)

        // Utils
        const cache = new Cache()

        // Sources
        const nintendoSource = await sourceRepository.get(SOURCE_NAMES.nintendo)

        // Fetchers
        const nintendoFetcher = new NintendoOfficialShop(nintendoSource)

        // Crawlers
        const nintendoCrawler = new NintendoSwitch(nintendoFetcher, gameRepository, sourceLogRepository)

        // Tasks
        const crawlerTaskManager = new TaskManager(cache, 1000)


        // Tasks Handlers
        crawlerTaskManager.on(TASKS.crawl, (data)=>{
            return nintendoCrawler.crawl()
        })


        app.use('/games', (()=>{
            const router = express.Router()

            router.get('/search', createGameSearchHandler())

            return router
        })())

        app.use('/crawler', (()=>{
            const router = express.Router()

            router.get('/nintendo', createCrawlerNintendoHandler(crawlerTaskManager))
            router.get('/info', crawlerInfoHandler(crawlerTaskManager))

            return router
        })())


        app.listen(Number(process.env.SERVER_PORT), process.env.SERVER_HOST, ()=> {
            console.log(`Listen local ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
        })
    })
}

run()
