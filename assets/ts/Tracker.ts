export {Tracker};

import "@fortawesome/fontawesome-free/js/all.js";
// @ts-ignore
import {Project} from "./Project.ts";

// @ts-ignore
import {AddWindow} from "./addWindow.ts";

// @ts-ignore
import {Chrono} from "./Chrono.ts";

// @ts-ignore
import {DetailsPage} from "./DetailsPage.ts";

class Tracker{
    public addWindow: AddWindow;
    public chrono: Chrono;
    public check: boolean;
    public checkDetails:boolean;

    constructor() {
        this.addWindow = new AddWindow();
        this.chrono = new Chrono();
        this.check = true;
        this.checkDetails = true;
    }

    /**
     * Init trackers
     * @param container
     */
    init(container:HTMLElement) {
        this.trackerConfig(container);
    }

    /**
     * Create div with data into localStorage
     * @param container
     */
    trackerConfig(container:HTMLElement) {
        if(localStorage.length !== 0) {
            for(let x:number = 0; x < localStorage.length; x++) {
                let key = localStorage.key(x) as string;
                if((localStorage.getItem(key)!).indexOf("Project:")) {
                    // @ts-ignore
                    let value:Project = JSON.parse(localStorage.getItem(key));

                    this.trackerConstructor(container, key, value);
                }
            }
        }
    }

    /**
     * Create a div for content tracker
     * @param container
     * @param key
     * @param value
     */
    trackerConstructor(container:HTMLElement, key:string, value:Project) {
        let contentDiv: HTMLElement = document.createElement("div");
        let divLeft: HTMLElement = document.createElement("div");
        let divUp:HTMLElement = document.createElement("div");
        let title: HTMLElement = document.createElement("h2");
        let divTimer: HTMLElement = document.createElement("div");
        let timer: HTMLElement = document.createElement("i");
        let pTimer: HTMLElement = document.createElement("p");
        let divDate: HTMLElement = document.createElement("div");
        let date: HTMLElement = document.createElement("i");
        let pDate: HTMLElement = document.createElement("p");
        let divBottom:HTMLElement = document.createElement("div");
        let deleteButton: HTMLElement = document.createElement("div");
        let detailsButton: HTMLElement = document.createElement("div");
        let addButton: HTMLElement = document.createElement("div");
        let listDiv: HTMLElement = document.createElement("div");

        title.innerHTML = key;

        // @ts-ignore
        pTimer.innerHTML = Math.round(value.time / 3600) + " h";
        // @ts-ignore
        pDate.innerHTML = Math.round((Date.now() - value.date)/1000/60/60/24) + " jours";
        deleteButton.innerHTML = "Supprimer";
        detailsButton.innerHTML = "Détails";
        addButton.innerHTML = "Ajouter";

        timer.className = "far fa-clock";
        date.className = "far fa-calendar-alt";

        contentDiv.appendChild(divLeft);
        divLeft.appendChild(title);
        divLeft.appendChild(divUp);
        divUp.appendChild(divTimer);
        divTimer.appendChild(timer);
        divTimer.appendChild(pTimer);
        divUp.appendChild(divDate);
        divDate.appendChild(date);
        divDate.appendChild(pDate);
        divLeft.appendChild(divBottom);
        divBottom.appendChild(deleteButton);
        divBottom.appendChild(detailsButton);
        divBottom.appendChild(addButton);
        contentDiv.appendChild(listDiv);
        container.appendChild(contentDiv)
        this.listTaskContent(listDiv, value, key);
        this.addTask(value, addButton, key, listDiv);
        this.deleteProject(key, deleteButton, contentDiv);
        this.details(detailsButton, key, listDiv);
    }

    /**
     * Add content list into content div
     * @param divContainer
     * @param value
     * @param key
     */
    listTaskContent(divContainer: HTMLElement, value:Project, key:string) {
        if(value.task.length !== 0) {
            for(let x:number = 0; x < value.task.length; x++) {
                let divContent: HTMLElement = document.createElement("div");
                let divTitle:HTMLElement = document.createElement("div");
                let divTimer:HTMLElement = document.createElement("div");
                let timer:HTMLElement = document.createElement("i");

                divTimer.dataset.time = "0";
                timer.className = "far fa-clock";
                divTitle.innerHTML = value.task[x].name;

                divContent.appendChild(divTitle);
                divContent.appendChild(divTimer);
                divTimer.appendChild(timer);
                divContainer.appendChild(divContent);
                divTimer.addEventListener("click", () => {
                    this.chrono.chronoStart(divTimer, key, value.task[x], x, 0);
                    this.check = this.chrono.check;

                })
            }
        }
    }

    /**
     * Open a window for add task
     * @param value
     * @param button
     * @param name
     * @param divList
     */
    addTask(value:Project, button:HTMLElement, name:string, divList:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.chrono.check && !document.getElementById("divDetailsPage")) {
                this.addWindow.init(1, "Nommer la tâche", name, value).then(() => {
                    document.getElementById("addButton")!.addEventListener("click", () => {
                        divList.innerHTML = "";
                        let project:Project = new Project()
                        this.listTaskContent(divList, JSON.parse(localStorage.getItem(name)!), name);
                    })
                })
            }
        });
    }

    /**
     * Delete a project
     * @param name
     * @param button
     * @param remove
     */
    deleteProject(name:string, button:HTMLElement, remove:HTMLElement) {
        button.addEventListener("click", ()=> {
            if(this.chrono.check && !document.getElementById("divDetailsPage")) {
                this.addWindow.init(2, "Supprimer le project?", name, null, remove).then();
            }
        });
    }

    /**
     * Create details page
     * @param button
     * @param title
     * @param contentDiv
     */
    details(button:HTMLElement, title:string, contentDiv:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.chrono.check && !document.getElementById("divDetailsPage")) {
                let detailsPage = new DetailsPage();
                detailsPage.init();
                detailsPage.titleConfig(title);
                detailsPage.footerConfig(title, contentDiv);
                detailsPage.TaskContent(title, contentDiv);
            }
        });
    }
}