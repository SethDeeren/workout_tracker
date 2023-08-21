class Exercise {
    id: number | null;
    name: string;
    type: string;
    key:string;


    constructor(id: number | null, name: string, type: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.key = `${name} ${type} ${Math.random() * 1000}`
    }
}

export default Exercise;