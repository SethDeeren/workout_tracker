class ExerciseRequest {
    name: string;
    type: string;
    sets: number = 0;
    reps: number = 0;
    time: number = 0;
    distance: number = 0;
   // key:string;


    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
       // this.key = `${name} ${type} ${Math.random() * 1000}`
    }

    setSets(sets: number) {
        this.sets = sets;
    }

    setReps(reps: number) {
        this.reps = reps;
    }

    setTime(time: number) {
        this.time = time;
    }

    setDistance(number: number) {
        this.distance = this.distance;
    }
}

export default ExerciseRequest;