// @ts-ignore
import {Project} from "./Project.ts";

export {DetailsPage};

class DetailsPage {
    public divContainer:HTMLElement;
    public divTitle:HTMLElement;
    public title:HTMLElement;
    public divContent:HTMLElement;
    public divFooter:HTMLElement;

    constructor() {
        this.divContainer = document.createElement("div") as HTMLElement;
        this.divTitle = document.createElement("div") as HTMLElement;
        this.title = document.createElement("h2") as HTMLElement;
        this.divContent = document.createElement("div") as HTMLElement;
        this.divFooter = document.createElement("div") as HTMLElement;
    }

    init() {
        this.divContainer.id = "divDetailsPage";
        this.divContainer.appendChild(this.divTitle);
        this.divContainer.appendChild(this.divContent);
        this.divContainer.appendChild(this.divFooter);
        document.body.appendChild(this.divContainer);
    }

    titleConfig(title:string) {
        this.divTitle.innerHTML = "";
        this.divTitle.appendChild(this.title);
        this.title.innerHTML = "Projet: " + title;
    }

    footerConfig(name:string) {
        this.divFooter.innerHTML = "";
        let project: Project = JSON.parse(localStorage.getItem(name)!);
        let divTimer = document.createElement("div") as HTMLElement;
        let timer = document.createElement("i") as HTMLElement;
        let pTimer = document.createElement("p") as HTMLElement;
        let spanReturn = document.createElement("span") as HTMLElement;
        let spanAdd = document.createElement("span") as HTMLElement;

        timer.className = "far fa-clock";
        spanReturn.innerHTML = "Retour";
        spanAdd.innerHTML = "Ajouter une tâche";
        pTimer.innerHTML = Math.round(project.time / 3600) + " h au total";

        divTimer.appendChild(timer);
        divTimer.appendChild(pTimer);
        this.divFooter.appendChild(divTimer);
        this.divFooter.appendChild(spanReturn);
        this.divFooter.appendChild(spanAdd);
        this.returnAction(spanReturn);
    }

    TaskContent(key:string) {
        this.divContent.innerHTML = "";
        let project: Project = JSON.parse(localStorage.getItem(key)!);
        if(project.task.length !== 0) {
            for(let x:number = 0; x < project.task.length; x++) {
                let divContent: HTMLElement = document.createElement("div");
                let divTitle:HTMLElement = document.createElement("div");
                let divTimer:HTMLElement = document.createElement("div");
                let timer:HTMLElement = document.createElement("i");
                let pTimer = document.createElement("p") as HTMLElement;

                pTimer.innerHTML = Math.round(project.task[x].time / 60) + " min";
                divTimer.dataset.time = "0";
                timer.className = "far fa-clock";
                divTitle.innerHTML = project.task[x].name;

                divContent.appendChild(divTitle);
                divContent.appendChild(divTimer);
                divTimer.appendChild(timer);
                divTimer.appendChild(pTimer);
                this.divContent.appendChild(divContent);
                /*divTimer.addEventListener("click", () => {
                    this.chrono.chronoStart(divTimer, key, value.task[x], x);
                })*/
            }
        }
    }

    /**
     * Remove window details
     * @param button
     */
    returnAction(button:HTMLElement) {
        button.addEventListener("click", () => {
            this.divContainer.innerHTML = "0";
            this.divContainer.remove();
        })
    }
}