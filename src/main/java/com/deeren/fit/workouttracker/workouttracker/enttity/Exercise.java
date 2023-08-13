package com.deeren.fit.workouttracker.workouttracker.enttity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Entity
@Table(name = "exrs")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exrs_id")
    private long id;

    @Column(name = "exrs_nm")
    private String name;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exrs_wkt_id", nullable = false)
    private Workout workout;

    @Column(name = "exrs_type")
    private String type;

//    @Column(name = "gu_id")
//    public long globalUserId;

    // Strength Exercise

    @Column(name = "exrs_targ_sets")
    private int sets;

    @Column(name = "exrs_targ_reps")
    private int reps;

    @Column(name = "exrs_targ_weight")
    private double weight;


    // Endurance Exercise

    @Column(name = "exrs_targ_time")
    private double targetTime;

    @Column(name = "exrs_targ_dist")
    private double targetDistance;


    // Tracker
    // Orphan removal will lose all exercise trackers even if just updating this tracker
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL)
    private List<ExerciseTracker> exerciseTrackers = new ArrayList<>();

}
