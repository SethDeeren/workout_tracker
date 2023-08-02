package com.deeren.fit.workouttracker.workouttracker.service;

import com.deeren.fit.workouttracker.common.exception.ResourceNotFoundException;
import com.deeren.fit.workouttracker.workouttracker.enttity.Exercise;
import com.deeren.fit.workouttracker.workouttracker.payload.*;
import com.deeren.fit.workouttracker.workouttracker.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public Exercise findExerciseById(long id) {
        return exerciseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise", "Id", id));
    }

    public ExerciseTrackingResponseDTO findExerciseForTracking(long id) {
        Exercise exercise = exerciseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise", "Id", id));
        return mapToTrackingDTO(exercise);
    }

    private ExerciseTrackingResponseDTO mapToTrackingDTO(Exercise exercise) {
        ExerciseTrackingResponseDTO trackingDTO = new ExerciseTrackingResponseDTO();
        trackingDTO.setExerciseName(exercise.getName());
        trackingDTO.setExerciseType(exercise.getType().equals("strength") ? "strength" : "endurance");
        trackingDTO.setCurrentTrackers(
                getExerciseTrackerDTOs(exercise)
                    .stream()
                    .filter(tracker -> LocalDate.now().equals(tracker.getTrackerDateAndTime().toLocalDate()))
                    .collect(Collectors.toList())
        );
        trackingDTO.setHistoryTrackers(getExerciseTrackerDTOs(exercise));
        Collections.sort(trackingDTO.getHistoryTrackers(), new TrackerSorter());
        trackingDTO.getHistoryTrackers().stream().forEach(tracker -> tracker.setTrackerDateAndTime(tracker.getTrackerDateAndTime().withHour(0).withMinute(0).withSecond(0).withNano(0)));
        return trackingDTO;
    }

    private List<ExerciseTrackerDTO> getExerciseTrackerDTOs(Exercise exercise) {
        return exercise.getExerciseTrackers().stream()
                .map(tracker -> {
                    if (exercise.getType().equals("strength")) {
                        return new StrengthExerciseTrackerDTO(tracker.getWeight(), tracker.getReps(), tracker.getTrackerDateAndTime());
                    } else {
                        return new EnduranceExerciseTrackerDTO(tracker.getTime(), tracker.getDistance(), tracker.getTrackerDateAndTime());
                    }
                })
                .collect(Collectors.toList());
    }
}
