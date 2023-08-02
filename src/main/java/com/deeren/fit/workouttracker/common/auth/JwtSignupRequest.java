package com.deeren.fit.workouttracker.common.auth;

// To generate all the getters and setters
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtSignupRequest {

    @NotEmpty(message="Username must not be empty")
    private String username;
    private String name;
    @Email
    @NotEmpty
    private String email;
    @NotEmpty
    @Size(min = 6, message = "password must be at least 6 characters")
    private String password;
    private String role;


}
