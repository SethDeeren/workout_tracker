package com.deeren.fit.workouttracker.workouttracker.repository;

import com.deeren.fit.workouttracker.workouttracker.enttity.Exercise;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface ExerciseRepository extends CrudRepository<Exercise, Long> {
}
