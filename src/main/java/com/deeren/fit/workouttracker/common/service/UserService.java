package com.deeren.fit.workouttracker.common.service;

import com.deeren.fit.workouttracker.common.entity.User;
import com.deeren.fit.workouttracker.common.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    public User findUserByEmail(String name) {
        return userRepository.findByEmail(name);
    }
}
