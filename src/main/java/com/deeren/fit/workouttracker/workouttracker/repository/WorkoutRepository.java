package com.deeren.fit.workouttracker.workouttracker.repository;

import com.deeren.fit.workouttracker.workouttracker.enttity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;


public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByGlobalUserId(long id);
}
