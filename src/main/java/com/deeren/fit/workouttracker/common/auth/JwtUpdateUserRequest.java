package com.deeren.fit.workouttracker.common.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtUpdateUserRequest {

    private String username;
    @Email
    @NotEmpty(message="Must not be empty")
    private String email;
    @NotEmpty
    @Size(min = 6, message = "password must be at least 6 characters")
    private String newPassword;
}
