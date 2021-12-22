// @ts-ignore
import {Project} from "./Project.ts";
// @ts-ignore
import {Chrono} from "./Chrono.ts";

// @ts-ignore
import {AddWindow} from "./addWindow.ts";

// @ts-ignore
import {Tracker} from "./Tracker.ts";

export {DetailsPage};

class DetailsPage {
    public divContainer:HTMLElement;
    public divTitle:HTMLElement;
    public title:HTMLElement;
    public divContent:HTMLElement;
    public divFooter:HTMLElement;
    public chrono:Chrono;
    public addWindow:AddWindow;
    public tracker:Tracker;

    /**
     * Constructor
     */
    constructor() {
        this.divContainer = document.createElement("div") as HTMLElement;
        this.divTitle = document.createElement("div") as HTMLElement;
        this.title = document.createElement("h2") as HTMLElement;
        this.divContent = document.createElement("div") as HTMLElement;
        this.divFooter = document.createElement("div") as HTMLElement;
        this.chrono = new Chrono();
        this.addWindow = new AddWindow();
        this.tracker = new Tracker();
    }

    /**
     * Init details page
     */
    init() {
        this.divContainer.id = "divDetailsPage";
        this.divContainer.appendChild(this.divTitle);
        this.divContainer.appendChild(this.divContent);
        this.divContainer.appendChild(this.divFooter);
        document.body.appendChild(this.divContainer);
    }

    /**
     * Config for title div
     * @param title
     */
    titleConfig(title:string) {
        this.divTitle.innerHTML = "";
        this.divTitle.appendChild(this.title);
        this.title.innerHTML = "Projet: " + title;
    }

    /**
     * Config for footer div
     * @param name
     * @param contentDiv
     */
    footerConfig(name:string, contentDiv:HTMLElement) {
        this.divFooter.innerHTML = "";
        let project: Project = JSON.parse(localStorage.getItem(name)!);
        let divTimer = document.createElement("div") as HTMLElement;
        let timer = document.createElement("i") as HTMLElement;
        let pTimer = document.createElement("p") as HTMLElement;
        let spanReturn = document.createElement("span") as HTMLElement;
        let spanAdd = document.createElement("span") as HTMLElement;

        timer.className = "far fa-clock";
        spanReturn.innerHTML = "Retour";
        spanReturn.id = "returnDetails"
        spanAdd.innerHTML = "Ajouter une tâche";
        pTimer.innerHTML = Math.round(project.time / 3600) + " h au total";

        divTimer.appendChild(timer);
        divTimer.appendChild(pTimer);
        this.divFooter.appendChild(divTimer);
        this.divFooter.appendChild(spanReturn);
        this.divFooter.appendChild(spanAdd);
        this.returnAction(spanReturn);
        this.addAction(spanAdd, name, contentDiv);
    }

    /**
     * Add content task into content div
     * @param key
     * @param contentDiv
     * @constructor
     */
    TaskContent(key:string, contentDiv:HTMLElement) {
        this.divContent.innerHTML = "";
        let project: Project = JSON.parse(localStorage.getItem(key)!);
        if(project.task.length !== 0) {
            for(let x:number = 0; x < project.task.length; x++) {
                let divContent: HTMLElement = document.createElement("div");
                let divTitle:HTMLElement = document.createElement("div");
                let divTimer:HTMLElement = document.createElement("div");
                let timer:HTMLElement = document.createElement("i");
                let pTimer:HTMLElement = document.createElement("p") as HTMLElement;
                let divDate:HTMLElement = document.createElement("div");
                let date:HTMLElement = document.createElement("i");
                let pDate:HTMLElement = document.createElement("p") as HTMLElement;
                let divDelete:HTMLElement = document.createElement("div");
                let deleteB:HTMLElement = document.createElement("i");
                let divUpdate:HTMLElement = document.createElement("div");
                let updateB:HTMLElement = document.createElement("i");

                pTimer.innerHTML = Math.round(project.task[x].time / 60) + " min";
                pDate.innerHTML = project.task[x].date;
                divTimer.dataset.time = "0";
                timer.className = "far fa-clock";
                date.className = "far fa-calendar-alt";
                deleteB.className = "fas fa-trash-alt";
                updateB.className = "fas fa-edit";
                divTitle.innerHTML = project.task[x].name;

                divContent.appendChild(divTitle);
                divContent.appendChild(divTimer);
                divContent.appendChild(divDate);
                divContent.appendChild(divDelete);
                divContent.appendChild(divUpdate);
                divTimer.appendChild(timer);
                divTimer.appendChild(pTimer);
                divDate.appendChild(date);
                divDate.appendChild(pDate);
                divDelete.appendChild(deleteB);
                divUpdate.appendChild(updateB);
                this.divContent.appendChild(divContent);
                divTimer.addEventListener("click", () => {
                    this.chrono.chronoStart(divTimer, key, project.task[x], x, 1);
                });

                this.deleteAction(divDelete, divContent, key, x, contentDiv);
                this.updateAction(divUpdate, divContent, key, x, contentDiv);
            }
        }
    }

    /**
     * Remove window details
     * @param button
     */
    returnAction(button:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.chrono.check) {
                this.divContainer.innerHTML = "";
                this.divContainer.remove();
            }
        });
    }

    /**
     * Delete a task
     * @param button
     * @param element
     * @param name
     * @param x
     * @param contentDiv
     */
    deleteAction(button:HTMLElement, element:HTMLElement, name:string, x:number, contentDiv:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.chrono.check) {
                let project = JSON.parse(localStorage.getItem(name)!);
                project.task.splice(x, 1);
                localStorage.setItem(name, JSON.stringify(project));
                let contentHome:HTMLElement = contentDiv.children[x] as HTMLElement;
                contentHome.remove();
                element.remove();
            }
        });
    }

    /**
     * Update a task into project
     * @param button
     * @param element
     * @param name
     * @param x
     * @param contentDiv
     */
    updateAction(button:HTMLElement, element:HTMLElement, name:string, x:number, contentDiv:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.chrono.check) {
                this.addWindow.init(3, "Renommer la tâche", name,null, null, x).then(() => {
                    document.getElementById("addButton")!.addEventListener("click", () => {
                        this.divContent.innerHTML = "";
                        this.TaskContent(name, contentDiv);
                        let contentHome:HTMLElement = contentDiv.children[x].firstChild as HTMLElement;
                        contentHome.innerHTML = JSON.parse(localStorage.getItem(name)!).task[x].name;
                    });
                });
            }
        });
    }

    /**
     * Add a task into a project
     * @param button
     * @param name
     * @param contentDiv
     */
    addAction(button:HTMLElement, name:string, contentDiv:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.chrono.check) {
                this.addWindow.init(1, "Nommer la tâche", name).then(() => {
                    document.getElementById("addButton")!.addEventListener("click", () => {
                        this.divContent.innerHTML = "";
                        this.TaskContent(name, contentDiv);
                        contentDiv.innerHTML = "";
                        this.tracker.listTaskContent(contentDiv, JSON.parse(localStorage.getItem(name)!), name);

                    })
                })
            }
        });
    }
}