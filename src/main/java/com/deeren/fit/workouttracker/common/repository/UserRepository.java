package com.deeren.fit.workouttracker.common.repository;

import com.deeren.fit.workouttracker.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findById(long userId);
    User findByUsername(String username);
    User findByEmail(String email);
}
