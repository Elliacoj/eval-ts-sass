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
        this.divTitle.appendChild(this.title);
        this.divContainer.appendChild(this.divContent);
        this.divContainer.appendChild(this.divFooter);
        document.body.appendChild(this.divContainer);
    }

    titleConfig(title:string) {
        this.title.innerHTML = "Projet: " + title;
    }
}