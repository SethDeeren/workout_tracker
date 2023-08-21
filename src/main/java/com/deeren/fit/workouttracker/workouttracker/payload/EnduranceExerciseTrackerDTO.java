package com.deeren.fit.workouttracker.workouttracker.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EnduranceExerciseTrackerDTO extends ExerciseTrackerDTO{
    double time;
    double distance;

    public EnduranceExerciseTrackerDTO(double time, double distance) {
        this.time = time;
        this.distance = distance;
    }

    public EnduranceExerciseTrackerDTO(long id, double time, double distance, LocalDateTime trackerDateAndTime) {
        super(id, trackerDateAndTime);
        this.time = time;
        this.distance = distance;
    }
}
