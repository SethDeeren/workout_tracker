import React from "react";
import ExerciseProgressLineChart from "./ExerciseProgressLineChart";

const ExerciseProgressTracker: React.FC<{
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
}> = (props) => {


    return (
        <div
            onTouchStart={props.onTouchStart}
            onTouchMove={props.onTouchMove}
            onTouchEnd={props.onTouchEnd}
        >
            <ExerciseProgressLineChart option={"set"} type={"Volume"}/>
            <ExerciseProgressLineChart option={"set"} type={"Weight"}/>
            <ExerciseProgressLineChart option={"set"} type={"Reps"}/>

        </div>
    );
};

export default ExerciseProgressTracker;
