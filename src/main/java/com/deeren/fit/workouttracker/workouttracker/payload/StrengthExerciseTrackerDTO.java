package com.deeren.fit.workouttracker.workouttracker.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StrengthExerciseTrackerDTO extends ExerciseTrackerDTO{
    //@NotEmpty(message = "must enter a weight")
    double weight;
    //@NotEmpty(message = "must enter reps")
    int reps;

    public StrengthExerciseTrackerDTO(double weight, int reps) {
        this.weight = weight;
        this.reps = reps;
    }

    public StrengthExerciseTrackerDTO(double weight, int reps, LocalDateTime trackerDateAndTime) {
        super(trackerDateAndTime);
        this.weight = weight;
        this.reps = reps;
    }
}
