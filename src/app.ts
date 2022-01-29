import * as dotenv from 'dotenv'
dotenv.config()

require('reflect-metadata')
import * as express from 'express'
import {createConnection} from "typeorm";
import ormconfig from "../ormconfig";
import {NintendoOfficialShop} from "./sources/nintendo/api";
import {NintendoSwitch} from "./service/crawler/NintendoSwitch";
import gameApi from './api/game'

const app = express()

app.use('/games', gameApi)
createConnection(ormconfig[0])

app.get('/', (async (req, res) => {
    const nintendoCrawler = new NintendoSwitch()
    await nintendoCrawler.crawl()

    res.json({})
}))

app.get('/crawler/nintend_switch/official_shop', (async (req, res) => {
    const nintendoCrawler = new NintendoSwitch()
    const result = await nintendoCrawler.crawl()

    res.json(result)
}))

app.listen(Number(process.env.SERVER_PORT), process.env.SERVER_HOST, ()=> {
    console.log(`Listen local ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})
