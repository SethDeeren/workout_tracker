package com.deeren.fit.workouttracker.workouttracker.enttity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "wkt")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wkt_id")
    private long id;

    @Column(name="wkt_nm")
    private String title;

    @Column(name="wkt_desc")
    private String description;

    @Column(name="gu_id")
    private long globalUserId;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Exercise> exercises = new HashSet<>();


    public void addExercise(Exercise exercise){
        this.exercises.add(exercise);
    }
}
