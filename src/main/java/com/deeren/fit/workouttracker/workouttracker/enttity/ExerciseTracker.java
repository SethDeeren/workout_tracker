package com.deeren.fit.workouttracker.workouttracker.enttity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "exrs_trckr")
public class ExerciseTracker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "extrk_id")
    private long id;

    @Column(name ="extrk_set")
    private int set;

    @Column(name = "extrk_reps")
    private int reps;

    @Column(name = "extrk_weight")
    private double weight;

    @Column(name = "extrk_dist")
    private double distance;

    @Column(name = "extrk_time")
    private double time;

    @CreationTimestamp
    @Column(name = "extrk_date", nullable = false)
    private LocalDateTime trackerDateAndTime;

//    @Column(name="gu_id")
//    private long globalUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "extrk_exrs_id", nullable = false)
    private Exercise exercise;


}
