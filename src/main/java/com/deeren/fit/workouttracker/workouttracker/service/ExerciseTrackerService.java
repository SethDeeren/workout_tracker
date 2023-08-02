package com.deeren.fit.workouttracker.workouttracker.service;

import com.deeren.fit.workouttracker.common.exception.FitClubAPIException;
import com.deeren.fit.workouttracker.common.exception.ResourceNotFoundException;
import com.deeren.fit.workouttracker.workouttracker.enttity.Exercise;
import com.deeren.fit.workouttracker.workouttracker.enttity.ExerciseTracker;
import com.deeren.fit.workouttracker.workouttracker.payload.EnduranceExerciseTrackerDTO;
import com.deeren.fit.workouttracker.workouttracker.payload.ExerciseTrackerDTO;
import com.deeren.fit.workouttracker.workouttracker.payload.StrengthExerciseTrackerDTO;
import com.deeren.fit.workouttracker.workouttracker.repository.ExerciseRepository;
import com.deeren.fit.workouttracker.workouttracker.repository.ExerciseTrackerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
public class ExerciseTrackerService {

    ExerciseTrackerRepository exerciseTrackerRepository;
    ExerciseRepository exerciseRepository;
    private ModelMapper mapper;

    ExerciseTrackerService(ExerciseTrackerRepository exerciseTrackerRepository, ExerciseRepository exerciseRepository, ModelMapper mapper) {
        this.exerciseTrackerRepository = exerciseTrackerRepository;
        this.exerciseRepository = exerciseRepository;
        this.mapper = mapper;
    }


    public List<ExerciseTracker> findAllTrackersByExerciseId(long id) {
        Exercise exercise = exerciseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Exercise", "Id", id));
        List<ExerciseTracker> exerciseTrackers = exerciseTrackerRepository.findAllByExercise(exercise);
        return exerciseTrackers;
    }

    public ExerciseTrackerDTO addTracker(long exerciseId, ExerciseTrackerDTO trackerDTO) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new ResourceNotFoundException("Exercise", "Id", exerciseId));
        // need to validate that tracker being added shares the same type as the exercise
        if(
            !(
                (exercise.getType().equals("strength") && trackerDTO instanceof StrengthExerciseTrackerDTO) ||
                (exercise.getType().equals("endurance") && trackerDTO instanceof  EnduranceExerciseTrackerDTO)
            )
        ){
            throw new FitClubAPIException(HttpStatus.BAD_REQUEST, "Miss matched tracker type to exercise");
        }
        ExerciseTracker newExerciseTracker = mapToEntity(trackerDTO);
        newExerciseTracker.setExercise(exercise);
        ExerciseTracker savedExerciseTracker = exerciseTrackerRepository.saveAndFlush(newExerciseTracker);
        return mapToDTO(savedExerciseTracker);
    }

    private ExerciseTracker mapToEntity(ExerciseTrackerDTO trackerDTO) {
        ExerciseTracker exerciseTracker = mapper.map(trackerDTO, ExerciseTracker.class);
        return exerciseTracker;
    }

    private ExerciseTrackerDTO mapToDTO(ExerciseTracker exerciseTracker) {
        ExerciseTrackerDTO exerciseTrackerDTO;
        if(exerciseTracker.getExercise().getType().equals("strength")){
            exerciseTrackerDTO = mapper.map(exerciseTracker, StrengthExerciseTrackerDTO.class);
        } else {
            exerciseTrackerDTO = mapper.map(exerciseTracker, EnduranceExerciseTrackerDTO.class);
        }
        return exerciseTrackerDTO;
    }

    public void deleteById(long trackerId) {
        exerciseTrackerRepository.deleteById(trackerId);
    }
}
