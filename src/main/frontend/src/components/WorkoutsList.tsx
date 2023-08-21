import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles/WorkoutList.module.css";
import useHttp from "../hooks/use-http";
import Workout from "../models/workout";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/strengthExercise";
import EnduranceExercise from "../models/enduranceExercise";
import { API } from "../config";


const ExerciseList: React.FC<{ workout: Workout }> = (props) => {
  const [showExercise, setShowExercise] = useState(false);

  const toggleShowExercise = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowExercise((prev) => !prev)
  };

  return (
    <>
      <div
        onClick={toggleShowExercise}
        className={styles["workout-list-item-footer"]}
      >
        <h4>Exercises</h4>
        <div className={styles.caret}></div>
      </div>
      {showExercise && (
        <div>
          <table>
            <tbody>
              {props.workout.exercises &&
                props.workout.exercises.map((exercise) => (
                  <tr key={`${exercise.name} ${exercise.id}`}>
                    <td>
                      {/* {`${exercise.name} ${exercise.type} ${exercise.sets}`} */}
                      {exercise instanceof StrengthExercise && `${exercise.name} ${exercise.sets} sets of ${exercise.reps} reps`}
                      {exercise instanceof EnduranceExercise && `${exercise.name} ${exercise.distance} or ${exercise.time}`}
                    </td>
                  </tr>
                ))}
                {props.workout.exercises.length === 0 && <tr><td>Exercise List Empty</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const WorkoutsList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { isLoading, error, sendRequest: fetchWorkouts } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    const mapToWorkoutItem = (workoutsParam: Workout[]) => {
      let index = 0;
      const workoutList: Workout[] = [];
      workoutsParam.forEach((w) => {
        const exercises: Exercise[] = [];
        w.exercises.forEach(ex => {
          if(ex.type === "strength") {
            exercises.push(new StrengthExercise(ex.id,ex.name, ex.type, (ex as StrengthExercise).sets, (ex as StrengthExercise).reps))
          } else {
            exercises.push(new EnduranceExercise(ex.id,ex.name, ex.type, (ex as EnduranceExercise).time, (ex as EnduranceExercise).distance))
          }
        })
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
        url: `${API}/workouts`,
        method: null,
        headers: null,
        body: null,
      },
      mapToWorkoutItem

    );
  }, [fetchWorkouts]);

  const goToWorkout = (id: number) => {
    console.log("got to workout page ", id)
    navigate(`/workouts/${id}`);
  }

  return (
    <div className={styles["workout-list"]}>
      {workouts.map((workout) => (
        <div onClick={() => goToWorkout(workout.id)} key={workout.id} className={styles["workout-list-item"]}>
          <div  className={styles["workout-list-item-header"]}>
            <FontAwesomeIcon icon={faCircleUser} size="2xl" />
            <div className={styles["workout-list-item-author"]}>
              <p>{workout.auther}</p>
              <p>02/28/23</p>
            </div>
            <h3 className={styles["workout-list-item-title"]}>
              {workout.title}
            </h3>
          </div>
          <div className={styles["workout-list-item-body"]}>
            <p className={styles["workout-list-item-description"]}>
              {workout.description.length < 100 && workout.description}
              {workout.description.length >= 100 &&
                `${workout.description.substring(0, 100)} ...`}
            </p>
          </div>
          <ExerciseList workout={workout} />
        </div>
      ))}
    </div>
  );
}

export default WorkoutsList;
