import {Request, Response} from "express";
import {ITaskManager} from "../../interfaces";
import {TASKS, TASKS_STATUSES} from "../../service/task_manager/tasks";
import {SOURCE_NAMES} from "../../constants/sources";


export function crawlerInfoHandler(taskManager: ITaskManager) {
    return async (req: Request, res: Response)=>{
        const {uuid} = req.query
        if (!uuid || typeof uuid !== "string") {
            res.status(400).json({
                error: "Bad request"
            })
            return
        }
        const taskStatus = taskManager.taskInfo(uuid)
        res.json({
            uuid,
            status: taskStatus
        })
    }
}
