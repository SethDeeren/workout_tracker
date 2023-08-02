package com.deeren.fit.workouttracker.common.restcontroller;

import com.deeren.fit.workouttracker.common.auth.*;
import com.deeren.fit.workouttracker.common.service.AuthService;
import com.deeren.fit.workouttracker.common.entity.User;
import com.deeren.fit.workouttracker.common.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;


    @PostMapping("/authenticate")
    @ApiOperation(value = "The login method, returns JWT Token")
    public ResponseEntity<?> authentication(@RequestBody JwtLoginRequest jwtRequest) throws Exception {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getEmail(),
                            jwtRequest.getPassword()

                    )
            );

        }catch (BadCredentialsException e) {

            //throw new Exception("Invalid Credentials", e);
           return ResponseEntity.status(403).body("Username or password does not exist");
        }

        //return getJWTResponse(jwtRequest.getEmail());
        return ResponseEntity.ok(authService.getJWTResponse(jwtRequest.getEmail()));
    }

    @PostMapping("/register")
    @ApiOperation(
            value = "The signup method",
            notes = "Will still need to login after registering"
    )
    public ResponseEntity<?> saveUser(@Valid @RequestBody JwtSignupRequest user) throws Exception {

        //Users savedUser = authService.save(user);
        //return getJWTResponse(savedUser.getUsername());
        return ResponseEntity.ok(authService.save(user));
    }

    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@Valid @RequestBody JwtUpdateUserRequest user) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String stop = "stop";
        // Ensuring you can't change things on another profile auth name is email
        if (!auth.getName().equals(user.getEmail())) {
            return ResponseEntity.status(403).body("Unauthorized request");
        }

        User savedUser = authService.updateUserCredentials(user);


        return ResponseEntity.ok(savedUser);
    }


//    // Send back the token
//    public ResponseEntity<?> getJWTResponse(String username) {
//        final UserDetails userDetails
//                = authService.loadUserByUsername(username);
//
//        final String token =
//                jwtUtility.generateToken(userDetails);
//
//        final String role = jwtUtility.getRoleFromToken(token);
//
//        return ResponseEntity.ok(new JwtResponse(username, role, token, jwtUtility.JWT_TOKEN_VALIDITY));
//    }
}

