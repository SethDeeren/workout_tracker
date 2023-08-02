package com.deeren.fit.workouttracker.workouttracker.restcontroller;

import com.deeren.fit.workouttracker.workouttracker.payload.ExerciseTrackerDTO;
import com.deeren.fit.workouttracker.workouttracker.service.ExerciseTrackerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class ExerciseTrackerController {

    ExerciseTrackerService exerciseTrackerService;

    ExerciseTrackerController(ExerciseTrackerService exerciseTrackerService) {
        this.exerciseTrackerService = exerciseTrackerService;
    }


//    TODO: Currently in ExerciseController not sure the best place
//    @GetMapping("/exercises/{id}/trackers")
//    public ResponseEntity<?> findAllTrackersByExerciseId(@PathVariable("id")long id) {
//        return ResponseEntity.ok(exerciseTrackerService.findAllTrackersByExerciseId(id));
//    }

    @PostMapping("/exercises/{id}/trackers")
    public ResponseEntity<?> addTracker(@PathVariable("id") long id,
                                        @Valid @RequestBody ExerciseTrackerDTO trackerDTO
    ) {
        return ResponseEntity.ok(exerciseTrackerService.addTracker(id, trackerDTO));
    }

    @DeleteMapping("/trackers/{trackerId}")
    public ResponseEntity<String> deleteExerciseTracker(@PathVariable("trackerId") long trackerId) {
        exerciseTrackerService.deleteById(trackerId);
        return new ResponseEntity<>("Tracker deleted", HttpStatus.OK);
    }



}
