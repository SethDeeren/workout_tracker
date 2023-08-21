import React, { useEffect, useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import ExcersiseForm from "../components/ExerciseForm";
import useHttp from "../hooks/use-http";
import { API } from "../config";

import Workout from "../models/workout";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/strengthExercise";

import classes from "../components/styles/Form.module.css";

const MyWorkoutEditPage = () => {
  const params = useParams();
  // initialize state
  const [workout, setWorkout] = useState<Workout>(
    new Workout("", "", "", 0, [])
  );
  const { isLoading, error, sendRequest: fetchWorkout } = useHttp();
  const { sendRequest: updateWorkout } = useHttp();

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const mapWorkout = (workoutParam: Workout) => {
      setWorkout(workoutParam);
      setExercises(workoutParam.exercises);
    };
    fetchWorkout(
      {
        url: `${API}/workouts/${params.id}`,
        method: null,
        headers: null,
        body: null,
      },
      mapWorkout
    );
  }, [fetchWorkout]);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(workout);

    const enteredTitle = titleInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current?.value;
    fetch(`${API}/workouts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify({
        id: workout.id,
        title: enteredTitle,
        description: enteredDescription,
        exercises: exercises,
      }),
    }).then((res) => {
      console.log("success!");
      navigate("/my-workouts");
    });
  };

  const deleteWorkoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete the this workout and all it's trackers?"
      )
    ) {
      fetch(`${API}/workouts/${workout.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      }).then((res) => {
        console.log("success!");
        navigate("/my-workouts");
      });
    }
  };

  
  const addExercisHandler = (ex: Exercise) => {
    let updatedExercises = exercises.filter(
      (x) => x.id === null || x.id !== ex.id
    );
    updatedExercises.push(ex);
    setExercises(updatedExercises);
    setWorkout(
      (prev: Workout) =>
        new Workout(
          prev.title,
          prev.description,
          prev.auther,
          prev.id,
          updatedExercises
        )
    );
    console.log("Workout: ", workout);
  };

  const openExeciseEdit = (ex: Exercise) => {
    setExercise(ex);
    setShowExerciseModal(true);
  };
  const handelExerciseFormClose = () => {
    setShowExerciseModal(false);
  };
  const showExerciseForm = (e: React.FormEvent) => {
    e.preventDefault();
    setShowExerciseModal((prev) => !prev);
  };
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout((prev) => ({ ...prev, title: e.target.value }));
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkout((prev) => ({ ...prev, description: e.target.value }));
  };

  return (
    <main>
      {showExerciseModal && (
        <ExcersiseForm
          addExercise={addExercisHandler}
          onClose={handelExerciseFormClose}
          exercise={exercise}
        />
      )}
      <h1 className={classes.title}>Edit Workout</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <label htmlFor={classes.workoutTitile}>Title</label>
        <input
          ref={titleInputRef}
          value={workout.title}
          onChange={onTitleChange}
          type="text"
          id={classes.workoutTitle}
          name="title"
          required
        />
        <label htmlFor={classes.workoutDescription}>Description</label>
        <textarea
          value={workout.description}
          onChange={onDescriptionChange}
          ref={descriptionInputRef}
          className={classes.workoutDescription}
          name="description"
        />
        <div className={classes["exercise-header"]}>
          <label htmlFor={classes.workoutTitile}>Exercises</label>
          <button
            onClick={showExerciseForm}
            className={classes["add-exercise-button"]}
          >
            +
          </button>
        </div>
        {/* <hr className={classes["exercise-divide"]} /> */}
        <table>
          <tbody>
            {workout.exercises.map(
              (ex) => (
                //ex instanceof StrengthExercise &&
                <tr key={`${ex.id} ${ex.name}`}>
                  <td>
                    <div>{`${ex.name} ${
                      (ex as StrengthExercise).sets
                    } sets of ${(ex as StrengthExercise).reps} reps`}</div>
                    <div
                      onClick={() => {
                        openExeciseEdit(ex);
                      }}
                      className={classes["edit-exercise"]}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} size="xl"/>
                    </div>
                  </td>
                </tr>
              )
              // TODO: other instnace types
            )}
          </tbody>
        </table>

        {/* <ExcersiseForm addExercise={addExercisHandler}/> */}
        {/* Add Exercise portion*/}

        <button>Update</button>

        <div className={classes.deleteSection}>
          <div className={classes.deleteSectionTitle}>Warning</div>
          <p className={classes.deleteSectionSubtitle}>
            All exercises and trackers for this workout will be lost
          </p>
          <button
            onClick={deleteWorkoutHandler}
            className={classes.deleteSectionButton}
          >
            Delete
          </button>
        </div>
      </form>
    </main>
  );
};

export default MyWorkoutEditPage;
