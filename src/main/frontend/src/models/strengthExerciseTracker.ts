import ExerciseTracker from "./exerciseTracker";

class StrengthExerciseTracker extends ExerciseTracker{
    weight: number;
    reps: number;

    constructor(id: string  | null, weight: number, reps: number, trackerDateAndTime: Date | null){
        super(id,"strength", trackerDateAndTime);
        this.weight = weight;
        this.reps = reps;
    }

    getJSONObject(): {} {
        return {...super.getJSONObject(), weight: this.weight, reps: this.reps};
    }

}

export default StrengthExerciseTracker;