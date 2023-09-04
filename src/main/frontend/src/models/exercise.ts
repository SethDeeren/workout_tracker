abstract class Exercise {
    id: number | null;
    private _workoutId = "0";
    name: string;
    type: string;
    key:string;


    constructor(id: number | null, name: string, type: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.key = `${name} ${type} ${Math.random() * 1000}`
    }

    public setKey() {
        this.key = `${this.name} ${this.type} ${Math.random() * 1000}`;
    }

    set workoutId(value: string) {
        this._workoutId = value;
    }

    get workoutId() {
        return this._workoutId;
    }

    abstract getJSONObject(): {};

}

export default Exercise;