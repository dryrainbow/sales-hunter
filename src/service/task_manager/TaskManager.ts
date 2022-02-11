import {EventEmitter} from "events";
import {TASKS, TASKS_STATUSES} from "./tasks";
import {randomUUID} from "crypto";
import {EmitTaskData, ICache, ITaskManager, TaskProcessor} from "../../interfaces";

const TASKS_STATUSES_TTL = 100000

type Task = {name: TASKS, data: EmitTaskData}
export class TaskManager implements ITaskManager{
    private cache: ICache
    private tasks: Array<Task>
    private handlers: {[key in TASKS]?: TaskProcessor[]}
    private interval: number

    constructor(cache: ICache, interval: number) {
        this.cache = cache
        this.tasks = []
        this.handlers = {}
        this.interval = interval

        this.runInterval()
    }

    addTask(name: TASKS, data: any): string {
        const taskUuid = randomUUID()
        this.cache.set(taskUuid, TASKS_STATUSES.processing, TASKS_STATUSES_TTL)
        this.addLocalTask(name, {taskUuid, data})
        return taskUuid
    }

    private addLocalTask(name: TASKS, data: EmitTaskData) {
        this.tasks.push({
            name,
            data
        })
    }

    on(task: TASKS, cb: TaskProcessor) {
        this.handlers[task] = this.handlers[task]? [...this.handlers[task], cb]: [cb]
    }

    runInterval() {
        setInterval(()=>{
            let task = this.tasks.pop()
            while (task !== undefined) {
                this.handleTask(task)
                task =  this.tasks.pop()
            }

        }, this.interval)
    }

    private handleTask(task: Task) {
        const handlers = this.handlers[task.name] || []
        handlers.forEach(handler=>{
            handler(task.data)
                .then(()=>{
                    this.cache.set(task.data.taskUuid, TASKS_STATUSES.success, TASKS_STATUSES_TTL)
                })
                .catch(()=>{
                    this.cache.set(task.data.taskUuid, TASKS_STATUSES.failed, TASKS_STATUSES_TTL)
                })
        })
    }

    taskInfo(uuid: string): string {
        const status = this.cache.get(uuid)
        return status || "";
    }
}

