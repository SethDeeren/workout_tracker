package com.deeren.fit.workouttracker.workouttracker.repository;

import com.deeren.fit.workouttracker.workouttracker.enttity.Exercise;
import com.deeren.fit.workouttracker.workouttracker.enttity.ExerciseTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseTrackerRepository extends JpaRepository<ExerciseTracker, Long> {
    List<ExerciseTracker> findAllByExercise(Exercise exercise);
}
