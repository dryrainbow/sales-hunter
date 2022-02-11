import {ICache} from "../../interfaces";

export class Cache implements ICache {
    storage: {
        [key: string]: string | undefined
    }
    constructor() {
        this.storage = {}
    }

    get(key: string): string{
        return this.storage[key]
    }

    set(key: string, data: string, ttl: number): void {
        this.storage[key] = data
    }
}
