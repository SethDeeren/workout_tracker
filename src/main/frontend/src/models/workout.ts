import Exercise from "./exercise";

class Workout {
    id: number;
    title: string;
    description: string;
    auther: string;
    exercises: Exercise[];

    constructor(title: string, description: string, auther: string, id: number, exercises: Exercise[]) {
        this.title = title;
        this.description = description;
        this.auther = auther;
        this.id = id;
        this.exercises = exercises;
    }
}

export default Workout;