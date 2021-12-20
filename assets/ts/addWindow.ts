export {AddWindow};

// @ts-ignore
import {Project} from "./Project.ts";

class AddWindow {
    public divContainer: HTMLElement;
    public title: HTMLElement;
    public input: HTMLInputElement;
    public buttonAdd: HTMLElement;
    public buttonReturn: HTMLElement;

    /**
     * Constructor
     */
    constructor() {
        this.divContainer = document.createElement("div");
        this.title = document.createElement("h2");
        this.input = document.createElement("input");
        this.buttonAdd = document.createElement("button");
        this.buttonReturn = document.createElement("button");
    }

    /**
     * Init the add window
     */
    init() {
        this.title.innerHTML = "Nommer le projet";
        this.buttonAdd.innerHTML = "Ajouter";
        this.buttonReturn.innerHTML = "Retour";

        this.divContainer.appendChild(this.title);
        this.divContainer.appendChild(this.title);
        this.divContainer.appendChild(this.input);
        this.divContainer.appendChild(this.buttonAdd);
        this.divContainer.appendChild(this.buttonReturn);

        this.divContainer.id = "addWindow";

        document.body.appendChild(this.divContainer);

        this.returnAction();
        this.addAction();
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
    addAction() {
        this.buttonAdd.addEventListener("click", () => {
            if(this.input.value !== "") {
                let newProject: Project = new Project();
                localStorage.setItem(this.input.value, JSON.stringify(newProject));

                this.divContainer.remove();
            }
        });
    }
}