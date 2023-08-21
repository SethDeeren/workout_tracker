class ExerciseTracker {
    id: string | null = null;
    type: string;
    trackerDateAndTime: Date | null;

    constructor(id: string | null, type: string, trackerDateAndTime: Date | null) {
        this.id = id;
        this.type = type;
        this.trackerDateAndTime = trackerDateAndTime;
    }
    
}

export default ExerciseTracker;