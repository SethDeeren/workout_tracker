package com.deeren.fit.workouttracker.workouttracker.payload;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = StrengthExerciseTrackerDTO.class, name = "strength"),
        @JsonSubTypes.Type(value = EnduranceExerciseTrackerDTO.class, name = "endurance")
})
public abstract class ExerciseTrackerDTO {
    //LocalDateTime getTrackerDateAndTime();
    long id;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") //'T'HH:mm
    LocalDateTime trackerDateAndTime;

}
