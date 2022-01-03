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
     * @param type
     */
    chronoStart(button:HTMLElement, key:string, value:Task, keyPlace:number, type:number) {
        if(button.dataset.time === "0" && this.check) {
            this.time = (JSON.parse(localStorage.getItem(key)!)).task[keyPlace].time;
            let set = setInterval(() => {
                this.time++;
                let task:Task = new Task(value.name, value.time, value.date);
                task.setTimeTask(this.time);
                task.setDateTask((new Date()).toLocaleDateString());

                let project: Project = JSON.parse(localStorage.getItem(key)!)
                project = new Project(project.time, project.date, project.task);

                project.updateTask(task, keyPlace);
                project.setTimeProject(project.time + 1);
                project.setDateProject(Date.now());

                localStorage.setItem(key, JSON.stringify(project));
                this.changeDataProject(button, project, type, task);

                let xhr = new XMLHttpRequest();
                xhr.open("PUT", "./api/index.php");
                xhr.responseType = "json";
                xhr.send(JSON.stringify({type: "chrono", task: button.dataset.id, timeProject: project.time, dateProject: project.date, timeTask: task.time, dateTask: task.date}));
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

    /**
     * Change timer and date into div left
     * @param element
     * @param project
     * @param type
     * @param task
     */
    changeDataProject(element:HTMLElement, project:Project, type:number, task:Task = 0) {
        let pTimer: HTMLParagraphElement;
        let pDate: HTMLParagraphElement;
        if(type === 0) {
            pTimer = element!.parentElement!.parentElement!.parentElement!.firstChild!.firstChild!.nextSibling!.firstChild!.lastChild as HTMLParagraphElement;
            pDate = element!.parentElement!.parentElement!.parentElement!.firstChild!.firstChild!.nextSibling!.lastChild!.lastChild as HTMLParagraphElement;
            pDate.innerHTML = Math.round((Date.now() - project.date)/1000/60/60/24) + " jours";
            pTimer.innerHTML = Math.round(project.time / 3600) + " h";
        }
        else {
            pTimer = element!.lastChild as HTMLParagraphElement;
            pDate = element!.nextSibling!.lastChild as HTMLParagraphElement;
            pTimer.innerHTML = Math.round(task.time / 60) + " min";
            pDate.innerHTML = task.date;
        }
    }
}