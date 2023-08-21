import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
//import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import Workout from "../models/workout";
import StrengthExercise from "../models/strengthExercise";
import EnduranceExercise from "../models/enduranceExercise";
import {API} from "../config";

import styles from "./styles/MyWorkoutList.module.css";

//TODO: Could possibly be generic list component where we pass the data fetchinch function to the component
const MyWorkoutExerciseList = () => {
  const [workout, setWorkouts] = useState<Workout>();
  const { isLoading, error, sendRequest: fetchWorkout } = useHttp();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    const mapToWorkoutItem = (workoutsParam: Workout) => {
      let index = 0;
      let workout: Workout = new Workout(
        workoutsParam.title,
        "",
        workoutsParam.auther,
        workoutsParam.id,
        []
      );
      workoutsParam.exercises.forEach((ex) => {
        if (ex.type === "strength") {
          workout.exercises.push(
            new StrengthExercise(
              Number(ex.id),
              ex.name,
              ex.type,
              (ex as StrengthExercise).sets,
              (ex as StrengthExercise).reps
            )
          );
        } else {
          workout.exercises.push(
            new EnduranceExercise(
              Number(ex.id),
              ex.name,
              ex.type,
              (ex as EnduranceExercise).time,
              (ex as EnduranceExercise).distance
            )
          );
        }
      });

      setWorkouts(workout);
    };
    fetchWorkout(
      {
        url: `${API}/workouts/${params.id}`,
        method: null,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: null,
      },
      mapToWorkoutItem
    );
  }, [fetchWorkout]);
  
  const goToExerciseTrackerPage = (exerciseId: number | null) => {
    console.log(exerciseId);
    navigate(`/my-workouts/${workout?.id}/exercises/${exerciseId}`);
  }


  return (
    <div className={styles.myWorkoutList}>
      <h1 className={styles.myWorkoutListTitle}>{workout?.title}</h1>
      {workout?.exercises.map((exercise) => (
        <div key={exercise.id} onClick={() => goToExerciseTrackerPage(exercise.id)} className={styles.myWorkoutListItem}>{exercise.name}</div>
      ))}
    </div>
  );
};

export default MyWorkoutExerciseList;
