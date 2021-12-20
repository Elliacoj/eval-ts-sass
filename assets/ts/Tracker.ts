import {Project} from "./Project";

export {Tracker};

import "@fortawesome/fontawesome-free/js/all.js";
/*import {Project} from "./Project.ts";
import {Task} from "./Task.ts";*/

class Tracker{
    public trackerArray: string[];

    constructor() {
        this.trackerArray = [];
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
        let divTimer: HTMLElement = document.createElement("div");
        let timer: HTMLElement = document.createElement("i");
        let pTimer: HTMLElement = document.createElement("p");
        let title: HTMLElement = document.createElement("h2");
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
        pTimer.innerHTML = value.time + " h";
        // @ts-ignore
        pDate.innerHTML = value.date + " jours";
        deleteButton.innerHTML = "Supprimer";
        detailsButton.innerHTML = "Détails";
        addButton.innerHTML = "Ajouter";

        timer.className = "far fa-clock";
        date.className = "far fa-calendar-alt";

        contentDiv.appendChild(divLeft);
        divLeft.appendChild(divUp);
        divUp.appendChild(divTimer);
        divTimer.appendChild(timer);
        divTimer.appendChild(pTimer);
        divUp.appendChild(title);
        divUp.appendChild(divDate);
        divDate.appendChild(date);
        divDate.appendChild(pDate);
        divLeft.appendChild(divBottom);
        divBottom.appendChild(deleteButton);
        divBottom.appendChild(detailsButton);
        divBottom.appendChild(addButton);
        contentDiv.appendChild(listDiv);
        container.appendChild(contentDiv)
    }
}