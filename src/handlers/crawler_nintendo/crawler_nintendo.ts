import {Request, Response} from "express";
import {ITaskManager} from "../../interfaces";
import {TASKS, TASKS_STATUSES} from "../../service/task_manager/tasks";
import {SOURCE_NAMES} from "../../constants/sources";


export function createCrawlerNintendoHandler(taskManager: ITaskManager) {
    return async (req: Request, res: Response)=>{
        const taskUuid = taskManager.addTask(TASKS.crawl, {
            sourceName: SOURCE_NAMES.nintendo
        })
        res.json({
            uuid: taskUuid,
            status: TASKS_STATUSES.processing
        })
    }
}
