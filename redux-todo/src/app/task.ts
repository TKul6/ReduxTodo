import { completeTask } from "./state/tasks-actions";

export class Task {
    private _id?: number;

    private _completed = false;

    get Id(): number{
        return this._id
    }

get completed(): boolean {
    return this._completed;
}

    constructor(public text: string, public important = false, id?: number, completed = false) {
        if (id) {
            this._id = id;
        }

        this._completed = completed;
    }

    public getCompletedTask(): Task {
        return new Task(this.text, this.important, this._id, true);
    }
}
