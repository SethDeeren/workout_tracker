import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../store/auth-context";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import Workout from "../models/workout";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/strengthExercise";
import EnduranceExercise from "../models/enduranceExercise";
import { API } from "../config";

import styles from "./styles/MyWorkoutList.module.css";

//TODO: Could possibly be generic list component where we pass the data fetchinch function to the component
const MyWorkoutList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { isLoading, error, sendRequest: fetchWorkouts } = useHttp();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const mapToWorkoutItem = (workoutsParam: Workout[]) => {
      let index = 0;
      const workoutList: Workout[] = [];
      workoutsParam.forEach((w) => {
        const exercises: Exercise[] = [];
        w.exercises.forEach((ex) => {
          if (ex.type === "strength") {
            exercises.push(
              new StrengthExercise(
                ex.id,
                ex.name,
                ex.type,
                (ex as StrengthExercise).sets,
                (ex as StrengthExercise).reps
              )
            );
          } else {
            exercises.push(
              new EnduranceExercise(
                ex.id,
                ex.name,
                ex.type,
                (ex as EnduranceExercise).time,
                (ex as EnduranceExercise).distance
              )
            );
          }
        });
        const workoutModel = new Workout(
          w.title,
          w.description,
          w.auther,
          w.id,
          exercises
          //w.exercises
        );
        workoutList.push(workoutModel);
        index++;
      });
      setWorkouts(workoutList);
    };
    fetchWorkouts(
      {
        url: `${API}/workouts/my-workouts`,
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
  }, [fetchWorkouts]);

  const goToWorkout = (id: number) => {
    console.log("got to workout page ", id);
    navigate(`/my-workouts/${id}/exercises`);
  };

  const handleEditLinkTouch = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.myWorkoutList}>
      <h1 className={styles.myWorkoutListTitle}>My Workout List</h1>
      {workouts.map((workout) => (
        <div
          key={workout.id}
          onClick={() => goToWorkout(workout.id)}
          className={styles.myWorkoutListItem}
        >
          {workout.title}
          <NavLink
            onClick={handleEditLinkTouch}
            to={`/my-workouts/${workout.id}`}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="lg"/>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default MyWorkoutList;
