package com.deeren.fit.workouttracker.workouttracker.restcontroller;

import com.deeren.fit.workouttracker.workouttracker.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ExerciseController {

    ExerciseService exerciseService;

    ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping("/exercises/{id}")
    public ResponseEntity<?> findExerciseById(@PathVariable("id") long id) {
        return ResponseEntity.ok(exerciseService.findExerciseById(id));
    }

    @GetMapping("/exercises/{id}/tracker")
    public ResponseEntity<?> findExerciseForTracking(@PathVariable("id") long id) {
        return ResponseEntity.ok(exerciseService.findExerciseForTracking(id));
    }


}
