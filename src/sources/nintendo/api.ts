import {NintendoOfficialGameResult} from "../../types/game";
import axios from "axios";
import {ISourceFetcher, ISourceLogger} from "../../interfaces";
import {Source} from "../../entity/Source";

const urls = {
    all: 'http://search.nintendo-europe.com/en/select?rows=9999&fq=type%3AGAME%20AND%20system_type%3Anintendoswitch*%20AND%20product_code_txt%3A*&q=*&sort=sorting_title%20asc&start=0&wt=json',
    forTest10: 'http://search.nintendo-europe.com/en/select?rows=10&fq=type%3AGAME%20AND%20system_type%3Anintendoswitch*%20AND%20product_code_txt%3A*&q=*&sort=sorting_title%20asc&start=0&wt=json'
}
export class NintendoOfficialShop implements ISourceFetcher{
    private readonly source: Source
    constructor(source: Source) {
        this.source = source
    }
    async parse(sourceLogger: ISourceLogger): Promise<NintendoOfficialGameResult[]> {
        console.log("RUN NINTENDO REQUEST")
        const url = urls.all
        const result = await axios.get(url)
        await sourceLogger.saveSourceRequest(this.source, url, '', JSON.stringify(result.data.response))
        console.log("NINTENDO REQUEST FINISHED")
        return result.data.response.docs
    }
}
