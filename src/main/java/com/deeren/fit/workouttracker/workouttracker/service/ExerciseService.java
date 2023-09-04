package com.deeren.fit.workouttracker.workouttracker.service;

import com.deeren.fit.workouttracker.common.exception.ResourceNotFoundException;
import com.deeren.fit.workouttracker.workouttracker.enttity.Exercise;
import com.deeren.fit.workouttracker.workouttracker.enttity.Workout;
import com.deeren.fit.workouttracker.workouttracker.payload.*;
import com.deeren.fit.workouttracker.workouttracker.repository.ExerciseRepository;
import com.deeren.fit.workouttracker.workouttracker.repository.WorkoutRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    ExerciseRepository exerciseRepository;
    WorkoutRepository workoutRepository;

    ModelMapper mapper;

    public ExerciseService(ExerciseRepository exerciseRepository,WorkoutRepository workoutRepository, ModelMapper mapper) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
        this.mapper = mapper;
    }

    public ExerciseDTO createExercise(ExerciseDTO exerciseDTO, long workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout", "Id", workoutId));

        Exercise exercise = mapToEntity(exerciseDTO);
        exercise.setWorkout(workout);
        workout.addExercise(exercise);
        Exercise savedExercise = exerciseRepository.save(exercise);
        return mapToDTO(savedExercise);
    }



    public Exercise findExerciseById(long id) {
        return exerciseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise", "Id", id));
    }

    public ExerciseTrackingResponseDTO findExerciseForTracking(long id) {
        Exercise exercise = exerciseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise", "Id", id));
        return mapToTrackingDTO(exercise);
    }

    public void deleteExercise(long id) {
        exerciseRepository.deleteById(id);
    }


    private ExerciseDTO mapToDTO(Exercise exercise) {
        return mapper.map(exercise, ExerciseDTO.class);
    }

    private Exercise mapToEntity(ExerciseDTO exerciseDTO) {
        return mapper.map(exerciseDTO, Exercise.class);
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
                        return new StrengthExerciseTrackerDTO(tracker.getId(), tracker.getWeight(), tracker.getReps(), tracker.getTrackerDateAndTime());
                    } else {
                        return new EnduranceExerciseTrackerDTO(tracker.getId(), tracker.getTime(), tracker.getDistance(), tracker.getTrackerDateAndTime());
                    }
                })
                .collect(Collectors.toList());
    }

}
