package com.deeren.fit.workouttracker.workouttracker.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutResponse {
    private List<WorkoutDTO> content;
    private int pageNo;
    private int pageSize;
    private int totalPages;
    private boolean last;

}
