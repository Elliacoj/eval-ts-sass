// @ts-ignore
import {Task} from "./Task.ts";

export {Project};
class Project {
    public time: number;
    public date: number;
    public task: Task[];

    /**
     * Constructor
     * @param time
     * @param date
     * @param task
     */
    constructor(time:number = 0, date:number = 0, task: Task[] = []) {
        this.time = time;
        this.date = date;
        this.task = task;
    }

    /**
     * Set the time of project
     * @param time
     */
    setTimeProject(time:number) {
        this.time = time;
    }

    /**
     * Set the date of project
     */
    setDateProject(date:number) {
        this.date = date;
    }

    /**
     * Set the task table
     * @param task
     */
    setTaskProject(task:Task[]) {
        this.task = task;
    }

    /**
     * Add a task into table
     * @param task
     */
    addTask(task:Task) {
        this.task.push(task);
    }

    /**
     * Delete a task into table
     * @param task
     */
    deleteTask(task:number) {
        this.task.splice(task, 1)
    }
}