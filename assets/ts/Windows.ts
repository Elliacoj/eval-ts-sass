export {Windows};

// @ts-ignore
import {Tracker} from "./Tracker.ts";
// @ts-ignore
import {AddWindow} from "./addWindow.ts";

class Windows {
    public container: HTMLDivElement;
    public titleBar: HTMLDivElement;
    public title: HTMLElement;
    public contentDiv: HTMLElement;
    public tracker: Tracker;
    public addWindow: AddWindow;

    /**
     * Constructor
     */
    constructor() {
        this.container = document.getElementById("container") as HTMLDivElement;
        this.titleBar = document.createElement("div") as HTMLDivElement;
        this.title = document.createElement("h1") as HTMLElement;
        this.contentDiv = document.createElement("div") as HTMLElement;
        this.tracker = new Tracker();
        this.addWindow = new AddWindow();
    }

    /**
     * Init the window
     */
    init() {
        this.titleBarConfig();
        this.contentDivConfig();
    }

    /**
     * Config the title bar
     */
    titleBarConfig() {
        this.title.innerHTML = "Time Tracker";
        this.titleBar.appendChild(this.title);
        this.container.appendChild(this.titleBar);
    }

    /**
     * Config the content div
     */
    contentDivConfig() {
        let buttonAdd:HTMLElement = document.createElement("button");
        buttonAdd.innerHTML = "Ajouter un projet";
        this.contentDiv.appendChild(buttonAdd);
        this.tracker.init(this.contentDiv);
        this.container.appendChild(this.contentDiv);
        this.addTracker(buttonAdd);
    }

    /**
     * Open a window for creat new tracker Project
     * @param button
     */
    addTracker(button:HTMLElement) {
        button.addEventListener("click", () => {
            if(this.tracker.check) {
                this.addWindow.init(0, "Nommer le project").then(() => {
                    document.getElementById("addButton")!.addEventListener("click", () => {
                        this.contentDiv.innerHTML = "";
                        this.contentDivConfig();
                    })
                });
            }
        });
    }
}