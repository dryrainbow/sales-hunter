import {getGamesEurope, getGamesAmerica} from 'nintendo-switch-eshop';
import {stores} from "./stores";
import {NintendoOfficialGameResult} from "../../types/game";
import puppeteer from "puppeteer-extra";
import axios from "axios";
var request = require('request');

const urls = {}
export class NintendoOfficialShop {
    async parse(): Promise<NintendoOfficialGameResult[]> {
        const result = await axios.get('http://search.nintendo-europe.com/en/select?rows=9999&fq=type%3AGAME%20AND%20system_type%3Anintendoswitch*%20AND%20product_code_txt%3A*&q=*&sort=sorting_title%20asc&start=0&wt=json' )
        return result.data.response.docs
    }


}
