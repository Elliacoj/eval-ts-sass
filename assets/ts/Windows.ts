export {Windows};

class Windows {
    public container: HTMLDivElement;
    public titleBar: HTMLDivElement;
    public title: HTMLElement;

    /**
     * Constructor
     */
    constructor() {
        this.container = document.getElementById("container") as HTMLDivElement;
        this.titleBar = document.createElement("div") as HTMLDivElement;
        this.title = document.createElement("h1") as HTMLElement;
    }

    init() {

    }

    titleBarConfig() {

    }
}