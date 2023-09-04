import Exercise from "./exercise";

class StrengthExercise extends Exercise {
    sets: number;
    reps: number;

    constructor( id: number | null, name: string, exerciseType: string, sets: number, reps: number) {
        super(id, name, exerciseType)
        this.sets = sets;
        this.reps = reps;
    }

    getJSONObject(): {} {
        return {id:this.id, name:this.name,type: this.type, sets: this.sets, reps: this.reps};
    }

}

export default StrengthExercise;