package com.deeren.fit.workouttracker.workouttracker.restcontroller;

import com.deeren.fit.workouttracker.workouttracker.payload.WorkoutDTO;
import com.deeren.fit.workouttracker.workouttracker.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkoutController {

    @Autowired
    WorkoutService workoutService;

    @GetMapping("/workouts") //TODO: add search criteria parameters and functionality
    public List<WorkoutDTO> getWorkouts(){
        return workoutService.searchWorkouts();
    }

    @GetMapping("/workouts/{id}")
    public ResponseEntity<?> getWorkoutById(@PathVariable("id") long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(id));
    }

    @GetMapping("/workouts/my-workouts")
    public ResponseEntity<?> getWorkoutsByUserId() {
        return ResponseEntity.ok(workoutService.getWorkoutsByUserId());
    }

    @PostMapping("/workouts")
    public ResponseEntity<?> createWorkout(@Valid @RequestBody WorkoutDTO workoutDTO){
        return ResponseEntity.ok(workoutService.createWorkout(workoutDTO));
    }

    @PutMapping("/workouts/{id}")
    public ResponseEntity<?> updateWorkout(@Valid @RequestBody WorkoutDTO workoutDTO, @PathVariable("id") long id) {
        return ResponseEntity.ok(workoutService.updateWorkout(workoutDTO, id));
    }

    @DeleteMapping("/workouts/{id}")
    public ResponseEntity<?> deleteWorkout(@PathVariable("id") long id) {
        return ResponseEntity.ok(workoutService.deleteWorkout(id));
    }

}
