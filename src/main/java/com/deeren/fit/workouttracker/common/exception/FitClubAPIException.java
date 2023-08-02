package com.deeren.fit.workouttracker.common.exception;

import org.springframework.http.HttpStatus;

public class FitClubAPIException extends RuntimeException{
    private HttpStatus status;
    private String message;

    public FitClubAPIException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public FitClubAPIException(HttpStatus status, String message, String message1) {
        super(message);
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus(){
        return status;
    }

    public String getMessage(){
        return message;
    }


}
