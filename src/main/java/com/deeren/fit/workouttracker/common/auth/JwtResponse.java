package com.deeren.fit.workouttracker.common.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String username;
    private String role;
    private String jwtToken;
    private long expiresIn;
}
