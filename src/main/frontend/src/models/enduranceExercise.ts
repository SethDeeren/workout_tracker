import Exercise from "./exercise";

class EnduranceExercise extends Exercise {
    time: number;
    distance: number;

    constructor( id: number | null, name: string, exerciseType: string, targetTime: number, targetDistance: number) {
        super(id, name, exerciseType)
        this.time = targetTime;
        this.distance = targetDistance;
    }

    getJSONObject(): {} {
        return {id:this.id, name:this.name,type: this.type, time: this.time, distance: this.distance };
    }

}

export default EnduranceExercise;