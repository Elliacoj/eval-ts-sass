// @ts-ignore
import {Windows} from "./Windows.ts";
// @ts-ignore
import {Project} from "./Project.ts";
// @ts-ignore
import { Task } from "./Task.ts";

localStorage.clear();

let xhr = new XMLHttpRequest();
xhr.open("GET", "./api/index.php?type=open");
xhr.responseType = "json";
xhr.send();
xhr.onload = () => {
    if(xhr.response.length !== 0) {
        let response = xhr.response;
        for(let project of response) {
            let newProject: Project = new Project();
            newProject.setTimeProject(project.time);
            newProject.setDateProject(project.date);

            for(let task of project.task) {
                let newTask: Task = new Task();
                newTask.setNameTask(task.name);
                newTask.setTimeTask(task.time);
                newTask.setDateTask(task.date);
                newProject.addTask(newTask);
            }
            localStorage.setItem(project.name, JSON.stringify(newProject));
        }
    }

    if(document.getElementById("container")) {
        const windows = new Windows();
        windows.init();
    }
}