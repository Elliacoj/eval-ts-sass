export {Chrono};

// @ts-ignore
import {Task} from "./Task.ts";
// @ts-ignore
import {Project} from "./Project.ts";

class Chrono {
    public time: number;
    public check: boolean;

    /**
     * Constructor
     */
    constructor() {
        this.time = 0;
        this.check = true;
    }

    /**
     * Start a chronometer for a task into a project
     * @param button
     * @param key
     * @param value
     * @param keyPlace
     */
    chronoStart(button:HTMLElement, key:string, value:Task, keyPlace:number) {
        if(button.dataset.time === "0" && this.check) {
            this.time = (JSON.parse(localStorage.getItem(key)!)).task[keyPlace].time;
            let set = setInterval(() => {
                this.time++;
                let task:Task = new Task(value.name, value.time, value.date);
                task.setTimeTask(this.time);

                let project: Project = JSON.parse(localStorage.getItem(key)!)
                project = new Project(project.time, project.date, project.task);

                project.updateTask(task, keyPlace);
                project.setTimeProject(project.time + 1);
                project.setDateProject(Date.now());

                localStorage.setItem(key, JSON.stringify(project));
                this.changeDataProject(button, project);
            }, 1000);

            button.addEventListener("click", () => {
                clearInterval(set);
            });
            button.style.color = "red";
            button.dataset.time = "1";
            this.check = false;
        }
        else if(button.dataset.time === "1"){
            button.style.color = "green";
            button.dataset.time = "0";
            this.check = true;
        }
    }

    changeDataProject(element:HTMLElement, project:Project) {
        let pTimer: HTMLParagraphElement = element!.parentElement!.parentElement!.parentElement!.firstChild!.firstChild!.firstChild!.lastChild! as HTMLParagraphElement;
        let pDate: HTMLParagraphElement = element!.parentElement!.parentElement!.parentElement!.firstChild!.firstChild!.lastChild!.lastChild! as HTMLParagraphElement;

        pTimer.innerHTML = Math.round(project.time / 3600) + " h";
        pDate.innerHTML = Math.round((Date.now() - project.date)/1000/60/60/24) + " jours";
    }
}