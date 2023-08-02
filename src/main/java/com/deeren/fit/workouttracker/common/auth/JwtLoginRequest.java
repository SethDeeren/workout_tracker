package com.deeren.fit.workouttracker.common.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtLoginRequest {

    @Email
    @NotEmpty
    private String email;
    @NotEmpty
    private String password;


}
