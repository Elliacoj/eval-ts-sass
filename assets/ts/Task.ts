export {Task};

class Task {
    public name: string;
    public time: number;
    public date: string;

    /**
     * Constructor
     * @param name
     * @param time
     * @param date
     */
    constructor(name:string, time:number = 0, date: string = (new Date()).toLocaleDateString()) {
        this.name = name;
        this.time = time;
        this.date = date;
    }

    /**
     * Set the name of task
     * @param name
     */
    setNameTask(name:string) {
        this.name = name;
    }

    /**
     * Set the time of task
     * @param time
     */
    setTimeTask(time:number) {
        this.time = time;
    }

    /**
     * Set the date of task
     * @param date
     */
    setDateTask(date:string) {
        this.date = date;
    }
}