export {AddWindow};

// @ts-ignore
import {Project} from "./Project.ts";
// @ts-ignore
import {Task} from "./Task.ts";

class AddWindow {
    public divContainer: HTMLElement;
    public title: HTMLElement;
    public input: HTMLInputElement;
    public buttonAdd: HTMLElement;
    public buttonReturn: HTMLElement;
    public spanError: HTMLElement;

    /**
     * Constructor
     */
    constructor() {
        this.divContainer = document.createElement("div");
        this.title = document.createElement("h2");
        this.input = document.createElement("input");
        this.buttonAdd = document.createElement("button");
        this.buttonReturn = document.createElement("button");
        this.spanError = document.createElement("span");
    }

    /**
     * Init the add window
     */
    async init(choice:number, nameWindow:string, name:string = "", project:object|null = null, element:HTMLElement|null = null, x:number = 0) {
        this.divContainer.innerHTML = "";
        this.buttonReturn.innerHTML = "Retour";
        this.buttonAdd.id = "addButton";
        this.divContainer.appendChild(this.title);
        if(choice === 0) {
            this.addProject(nameWindow);
        }
        else if(choice === 1) {
            this.addTask(nameWindow, name);
        }
        else if(choice === 2) {
            this.deleteProject(nameWindow, name, element!);
        }
        else if(choice === 3) {
            this.updateTask(nameWindow, name, element!, x);
        }

        this.divContainer.appendChild(this.buttonAdd);
        this.divContainer.appendChild(this.spanError);
        this.divContainer.appendChild(this.buttonReturn);

        this.divContainer.id = "addWindow";

        document.body.appendChild(this.divContainer);

        this.returnAction();
    }

    /**
     * Content for add project
     * @param name
     */
    addProject(name:string) {
        this.title.innerHTML = name;
        this.buttonAdd.innerHTML = "Ajouter";
        this.divContainer.appendChild(this.input);
        this.confirmProject();
    }

    /**
     * Content for add task
     * @param nameWindow
     * @param name
     */
    addTask(nameWindow:string, name:string) {
        let project: Project = JSON.parse(localStorage.getItem(name)!)
        this.title.innerHTML = nameWindow;
        this.buttonAdd.innerHTML = "Ajouter";
        this.divContainer.appendChild(this.input);
        this.buttonAdd.addEventListener("click", () => this.confirmTask(name, project));
    }

    /**
     * Content for delete project
     * @param nameWindow
     * @param remove
     * @param element
     */
    deleteProject(nameWindow:string, remove:string, element:HTMLElement) {
        this.title.innerHTML = nameWindow;
        this.buttonAdd.innerHTML = "Supprimer";
        this.buttonAdd.addEventListener("click", () => {
            localStorage.removeItem(remove);
            element.remove();

            let xhr = new XMLHttpRequest();
            xhr.open("DELETE", "./api/index.php");
            xhr.responseType = "json";
            xhr.send(JSON.stringify({type: "project", name: remove}));

            this.divContainer.remove();
        });
    }

    /**
     * Update a task
     * @param nameWindow
     * @param name
     * @param element
     * @param x
     */
    updateTask(nameWindow:string, name:string, element:HTMLElement, x:number) {
        this.title.innerHTML = nameWindow;
        this.buttonAdd.innerHTML = "Confirmer";
        this.input.value = JSON.parse(localStorage.getItem(name)!).task[x].name;
        this.divContainer.appendChild(this.input);
        this.buttonAdd.addEventListener("click", () => {
           let project = JSON.parse(localStorage.getItem(name)!);
           project.task[x].name = this.input.value;
           localStorage.setItem(name, JSON.stringify(project));
            this.divContainer.remove();

            let xhr = new XMLHttpRequest();
            xhr.open("PUT", "./api/index.php");
            xhr.responseType = "json";
            xhr.send(JSON.stringify({type: "rename", id: element.dataset.id, name: this.input.value}));
        });
    }

    /**
     * Delete div window at the click
     */
    returnAction() {
        this.buttonReturn.addEventListener("click", () => {
            this.divContainer.remove();
        })
    }

    /**
     * Add a project into local storage
     */
    confirmProject() {
        this.buttonAdd.addEventListener("click", () => {
            if(this.input.value !== "" && !localStorage.getItem(this.input.value)) {
                let newProject: Project = new Project();
                localStorage.setItem(this.input.value, JSON.stringify(newProject));

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "./api/index.php");
                xhr.responseType = "json";
                xhr.send(JSON.stringify({type: "project", name: this.input.value, time: 0, date: Date.now()}));
                this.divContainer.remove();
            }
            else {
                this.spanError.innerHTML = "Nom déjà pris!"
            }
        });
    }

    /**
     * Add a task into local storage
     */
    confirmTask(name:string, project: Project) {
        this.buttonAdd.removeEventListener("click", () => this.confirmTask(name, project));
        if(this.input.value !== "") {
            let newProject:Project = new Project(project.time, project.date, project.task);
            let task:Task = new Task(this.input.value)

            newProject.addTask(task);
            localStorage.setItem(name, JSON.stringify(newProject));

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "./api/index.php");
            xhr.responseType = "json";
            xhr.send(JSON.stringify({type: "task", name: this.input.value, time: 0, date: (new Date()).toLocaleDateString(), nameProject: name}));

            this.divContainer.remove();
        }
    }
}