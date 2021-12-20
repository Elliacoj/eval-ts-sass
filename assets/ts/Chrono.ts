export {Chrono};
class Chrono {
    public time: number;

    /**
     * Constructor
     * @param time
     */
    constructor(time:number) {
        this.time = time;
    }

    chronoStart(button:HTMLElement) {
        if(button.dataset.time === "0") {
            let set = setInterval(() => {
                console.log(this.time);
                this.time++;
            }, 1000);

            button.addEventListener("click", () => clearInterval(set));
            button.style.color = "red";
            button.dataset.time = "1";
        }
        else {
            button.style.color = "green";
            button.dataset.time = "0";
        }
    }
}