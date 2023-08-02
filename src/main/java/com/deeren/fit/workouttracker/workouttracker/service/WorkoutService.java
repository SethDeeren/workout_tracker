package com.deeren.fit.workouttracker.workouttracker.service;

import com.deeren.fit.workouttracker.common.exception.FitClubAPIException;
import com.deeren.fit.workouttracker.common.exception.ResourceNotFoundException;
import com.deeren.fit.workouttracker.common.repository.UserRepository;
import com.deeren.fit.workouttracker.common.entity.User;
import com.deeren.fit.workouttracker.workouttracker.enttity.Exercise;
import com.deeren.fit.workouttracker.workouttracker.enttity.Workout;
import com.deeren.fit.workouttracker.workouttracker.payload.WorkoutDTO;
import com.deeren.fit.workouttracker.workouttracker.repository.WorkoutRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkoutService {


    private WorkoutRepository workoutRepository;
    private UserRepository userRepository;
    private ModelMapper mapper;

    public WorkoutService(WorkoutRepository workoutRepository,UserRepository userRepository ,ModelMapper mapper) {
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }


    //TODO: add search criteria ability
    public List<WorkoutDTO> searchWorkouts() {
       return workoutRepository.findAll().stream().map(workout -> {
                   WorkoutDTO workoutDTO = mapToDTO(workout);
                   User user = userRepository.findById(workout.getGlobalUserId());
                   workoutDTO.setUsername(user.getUsername());
                   return workoutDTO;
               }).collect(Collectors.toList());
    }

    private Workout findById(long id) {
        return workoutRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Workout", "Id", id));
    }

    public WorkoutDTO getWorkoutById(long id) {
        return mapToDTO(findById(id));
    }

    public List<WorkoutDTO> getWorkoutsByUserId() {
        User user = getModifyingUser();
        return workoutRepository.findByGlobalUserId(user.getId()).stream().map(workout -> {
            WorkoutDTO workoutDTO = mapToDTO(workout);
            workoutDTO.setUsername(user.getUsername());
            return workoutDTO;
        }).collect(Collectors.toList());
    }

    public WorkoutDTO createWorkout(WorkoutDTO workoutDTO) {
        Workout newWorkout = mapToEntity(workoutDTO);
        return mapToDTO(workoutRepository.save(newWorkout));
    }

    public WorkoutDTO updateWorkout(WorkoutDTO workoutDTO, long id) {
        Workout originalWorkout = findById(id);
        Workout updatedWorkout = mapToEntity(workoutDTO);

        if(originalWorkout.getGlobalUserId() != updatedWorkout.getGlobalUserId()) {
            // need to trigger un authorized exception
            throw new FitClubAPIException(HttpStatus.FORBIDDEN, "unauthorized update");
        }

        updatedWorkout.setId(id);
        return mapToDTO(workoutRepository.save(updatedWorkout));
    }

    public String deleteWorkout(long id) {
        Workout workout = findById(id);
        if(workout.getGlobalUserId() != getModifyingUser().getId()) {
            // need to trigger un authorized exception
            throw new FitClubAPIException(HttpStatus.FORBIDDEN, "unauthorized deletion");
        }
        workoutRepository.delete(workout);
        return "Workout " + workout.getTitle() + " successfully deleted";

    }

    private Workout mapToEntity(WorkoutDTO workoutDTO){
        Workout workout = mapper.map(workoutDTO, Workout.class);
        //workout.getExercises().stream().forEach(ex -> ex.setWorkout(workout));
        for(Exercise ex : workout.getExercises()) {
            ex.setWorkout(workout);
            String stop = "stop";
        }
        User user = getModifyingUser();
        workout.setGlobalUserId(user.getId());
        return workout;
    }

    private WorkoutDTO mapToDTO(Workout workout){
       WorkoutDTO workoutDTO = mapper.map(workout, WorkoutDTO.class);
       if(getModifyingUser() != null) {
           String username = getModifyingUser().getUsername();
           workoutDTO.setUsername(username);
       }
       return workoutDTO;
    }

    private User getModifyingUser() {
        if(!SecurityContextHolder.getContext().getAuthentication().isAuthenticated()){
            return null;
        }
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail);
        return user;
    }

}
