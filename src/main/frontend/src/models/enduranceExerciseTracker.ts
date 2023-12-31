import ExerciseTracker from "./exerciseTracker";

class EnduranceExerciseTracker extends ExerciseTracker{
    time: number;
    distance: number;

    constructor(id: string | null, time: number, distance: number, trackerDateAndTime: Date | null){
        super(id,"endurance", trackerDateAndTime);
        this.time = time;
        this.distance = distance;
    }

    getJSONObject(): {} {
        return {...super.getJSONObject(), time: this.time, distance: this.distance};
    }
}

export default EnduranceExerciseTracker;