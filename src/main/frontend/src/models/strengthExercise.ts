import Exercise from "./exercise";

class StrengthExercise extends Exercise {
    sets: number;
    reps: number;

    constructor( id: number | null, name: string, exerciseType: string, sets: number, reps: number) {
        super(id, name, exerciseType)
        this.sets = sets;
        this.reps = reps;
    }

}

export default StrengthExercise;