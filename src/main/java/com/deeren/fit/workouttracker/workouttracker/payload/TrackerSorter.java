package com.deeren.fit.workouttracker.workouttracker.payload;

import java.util.Comparator;

public class TrackerSorter implements Comparator<ExerciseTrackerDTO> {
    @Override
    public int compare(ExerciseTrackerDTO a, ExerciseTrackerDTO b) {
        return b.getTrackerDateAndTime().compareTo(a.getTrackerDateAndTime());
    }
}
