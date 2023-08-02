package com.deeren.fit.workouttracker.workouttracker.payload;

import com.deeren.fit.workouttracker.workouttracker.enttity.ExerciseTracker;
import lombok.Data;

import java.util.Comparator;
import java.util.List;

@Data
public class ExerciseTrackingResponseDTO {

    String exerciseName;
    String exerciseType;
    List<ExerciseTrackerDTO> currentTrackers;
    List<ExerciseTrackerDTO> historyTrackers;



}
