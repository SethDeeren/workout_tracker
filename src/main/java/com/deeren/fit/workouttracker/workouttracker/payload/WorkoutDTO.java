package com.deeren.fit.workouttracker.workouttracker.payload;

import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutDTO {
    private long id;
    @NotEmpty(message = "title can not be empty")
    private String title;
    private String  description;
    //should be able to pull from security context for return value
    private String username;

    //private Set<StrengthExerciseDTO> strengthExercises;
    //private Set<EnduranceExerciseDTO> enduranceExercises;
    private Set<ExerciseDTO> exercises;
}
