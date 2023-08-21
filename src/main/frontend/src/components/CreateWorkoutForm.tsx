import React, { useRef, useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import ExcersiseForm from "./ExerciseForm";
import Exercise from "../models/exercise";
import classes from "./styles/Form.module.css";
import ExerciseModal from "./ExerciseModal";
import { AuthContext } from "../store/auth-context";
import StrengthExercise from "../models/strengthExercise";
import { API } from "../config";
import EnduranceExercise from "../models/enduranceExercise";

const CreateWorkoutForm: React.FC = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowExerciseModal = () => {
    setShowExerciseModal((showExerciseModal) => !showExerciseModal);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
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
        title: enteredTitle,
        description: enteredDescription,
        exercises: exercises,
      }),
    }).then((res) => {
      console.log("success!");
      clearForm();
      navigate("/my-workouts");
    });
  };

  const clearForm = () => {
    titleInputRef.current!.value = "";
    descriptionInputRef.current!.value = "";
    setExercises([]);
  };

  const addExercisHandler = (exercise: Exercise) => {
    setExercises((prev) => [...prev, exercise]);
  };

  const deleteExercise = (exerciseKey: string) => {
    setExercises((prev) => prev.filter((ex) => ex.key !== exerciseKey));
  };

  const showExerciseForm = (event: React.FormEvent) => {
    event.preventDefault();
    setShowExerciseModal((prev) => !prev);
  };

  const handeExerciseFormClose = () => {
    setShowExerciseModal(false);
  };

  const getExercises = () => {
    exercises.forEach((ex) => (
      <li>
        <span>ex.name</span>
        <span>ex.type</span>
      </li>
    ));
  };

  return (
    <main>
      {showExerciseModal && (
        <ExcersiseForm
          addExercise={addExercisHandler}
          onClose={handeExerciseFormClose}
          exercise={null} // only used for edit not create
        />
      )}
      <h1 className={classes.title}>Create Workout</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <label htmlFor={classes.workoutTitile}>Title</label>
        <input
          ref={titleInputRef}
          type="text"
          id={classes.workoutTitle}
          required
        />
        <label htmlFor={classes.workoutDescription}>Description</label>
        <textarea
          ref={descriptionInputRef}
          className={classes.workoutDescription}
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
            {exercises.map((ex) => {
              if (ex instanceof StrengthExercise) {
                return (
                  <tr key={ex.key}>
                    <td>
                      <div>{`${ex.name} ${ex.sets} sets of ${ex.reps} reps`}</div>
                      <div
                        onClick={() => deleteExercise(ex.key)}
                        className={classes["delete-exercise"]}
                      >
                        x
                      </div>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={ex.key}>
                  <td>
                    <div>{`${ex.name} time: ${(ex as EnduranceExercise).distance} distance: ${(ex as EnduranceExercise).time}`}</div>
                    <div
                      onClick={() => deleteExercise(ex.key)}
                      className={classes["delete-exercise"]}
                    >
                      x
                    </div>
                  </td>
                </tr>
                )
              }
            })}
          </tbody>
        </table>

        {/* <ExcersiseForm addExercise={addExercisHandler}/> */}
        {/* Add Exercise portion*/}

        <button>Create</button>
      </form>
    </main>
  );
};

export default CreateWorkoutForm;
