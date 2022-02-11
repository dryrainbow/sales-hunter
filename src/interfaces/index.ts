import {NintendoOfficialGameResult} from "../types/game";
import {Game} from "../entity/Game";
import {Source} from "../entity/Source";
import {TASKS} from "../service/task_manager/tasks";

export interface ISourceFetcher {
    parse: (sourceLogger: ISourceLogger)=>Promise<NintendoOfficialGameResult[]>
}
export interface IGameRepository {
    saveOrUpdateFromNintendo: (game: NintendoOfficialGameResult) => Promise<Game>
}
export interface ISourceLogger {
    saveSourceRequest: (source: Source, url: string, req: string, res: string) => Promise<unknown>
}

export interface ISourceRepository {
    get: (slug: string) => Promise<Source>
}

export interface ICrawler {
    crawl: () => Promise<{ count: number }>
}

export interface ICache {
    get(key: string): string | undefined
    set(key: string, data: string, ttl: number): void
}

export type EmitTaskData = {
    taskUuid: string
    data: any
}

export type TaskProcessor = (data: EmitTaskData) => Promise<any>



export interface ITaskManager {
    addTask(name: TASKS, data: any): string

    on(task: TASKS, cb: TaskProcessor): void

    runInterval(): void

    taskInfo(uuid: string): string
}
