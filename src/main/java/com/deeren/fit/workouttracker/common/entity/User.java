package com.deeren.fit.workouttracker.common.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="usr")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usr_id")
    private long id;
    @Column(name="usr_logn_nm")
    private String username;
    @Column(name="usr_nm")
    private String name;
    @Column(name="usr_email", unique = true)
    private String email;
    @Column(name="usr_pswd")
    private String password;
    @Column(name="usr_role")
    private String role;

}
