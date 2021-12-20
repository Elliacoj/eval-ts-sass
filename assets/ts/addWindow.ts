export {AddWindow};

class AddWindow {
    public divContainer: HTMLElement;
    public title: HTMLElement;
    public input: HTMLElement;
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
    }

    /**
     * Delete div window at the click
     */
    returnAction() {
        this.buttonReturn.addEventListener("click", () => {
            this.divContainer.remove();
        })
    }
}