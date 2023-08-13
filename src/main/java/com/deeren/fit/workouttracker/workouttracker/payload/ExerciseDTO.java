package com.deeren.fit.workouttracker.workouttracker.payload;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class ExerciseDTO {
    private long id;
    private String name;
    // StrengthExercise
    private int sets;
    private int reps;
    private double weight;
    // EnduranceExercise
    private double targetTime;
    private double targetDistance;
    // The type must have
    @NotEmpty
    private String type;
}
