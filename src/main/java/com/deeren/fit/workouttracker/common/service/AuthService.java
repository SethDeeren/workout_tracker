package com.deeren.fit.workouttracker.common.service;

import com.deeren.fit.workouttracker.common.auth.JWTUtility;
import com.deeren.fit.workouttracker.common.auth.JwtResponse;
import com.deeren.fit.workouttracker.common.auth.JwtSignupRequest;
import com.deeren.fit.workouttracker.common.auth.JwtUpdateUserRequest;
import com.deeren.fit.workouttracker.common.repository.UserRepository;
import com.deeren.fit.workouttracker.common.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private JWTUtility jwtUtility;
    private UserRepository userRepository;
    private PasswordEncoder bcryptEncoder;

    public AuthService(@Lazy UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.bcryptEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // logic to get the user from the Database
        List<SimpleGrantedAuthority> roles = null;
        User user = userRepository.findByEmail(email);
        if (user != null) {
            roles = Arrays.asList(new SimpleGrantedAuthority(user.getRole()));
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), roles);
        }
        throw new UsernameNotFoundException("User not found with email: " + email);
    }

    // move JWT response helper method from controller here, then fetch the user can be in the same transaction
    // for which saveAndFlush can handle
    public JwtResponse save(JwtSignupRequest user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setName(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        //newUser.setRole(user.getRole()); May implement this in the future
        newUser.setRole("ROLE_USER");
        User savedUser = userRepository.saveAndFlush(newUser);
        return getJWTResponse(savedUser.getEmail());
    }

    public User updateUserCredentials(JwtUpdateUserRequest user) {
        User dbUser = userRepository.findByEmail(user.getEmail());
        if (dbUser.getUsername() != null) {
            dbUser.setUsername(user.getUsername());
        }
        if (dbUser.getUsername() == null) {
            dbUser.setUsername(dbUser.getName()); // should be same anyway but for some reason username is coming back null
        }
        dbUser.setPassword(bcryptEncoder.encode(user.getNewPassword()));
        User savedUser = userRepository.save(dbUser);
        return savedUser;
    }

    // Send back the token
    public JwtResponse getJWTResponse(String username) {
        final UserDetails userDetails
                = loadUserByUsername(username);

        final String token =
                jwtUtility.generateToken(userDetails);

        final String role = jwtUtility.getRoleFromToken(token);

        return new JwtResponse(username, role, token, System.currentTimeMillis() + jwtUtility.JWT_TOKEN_VALIDITY);
    }
}
