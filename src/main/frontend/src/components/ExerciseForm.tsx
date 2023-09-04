import React, {useState, useRef, useEffect, useContext} from "react";
import {AuthContext} from "../store/auth-context";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/strengthExercise";
import EnduranceExercise from "../models/enduranceExercise";
import Select from "./UI/Select";
import Modal from "./UI/Modal";
import styles from "./styles/ExerciseForm.module.css";
import {API} from "../config";

const ExcersiseForm: React.FC<{
  addExercise: (exercise: Exercise) => void;
  deleteExercise: (ex: Exercise) => void;
  onClose: () => void;
  exercise: Exercise | null;
}> = (props) => {
  const exerciseTypeOptions = [
    // {label: "Select Type", value: "select"},
    { label: "Strength", value: "strength" },
    { label: "Endurance", value: "endurance" },
  ];

  const authCtx = useContext(AuthContext);
  const [exercise, setExercise] = useState<Exercise | null>(props.exercise);

  useEffect(() => {
    console.log("----------------rendered exercise form---------------------------")
  })
  const exerciseTypeInput =
    exercise && exercise.type === "endurance"
      ? exerciseTypeOptions[1]
      : exerciseTypeOptions[0];

  const [exerciseType, setExerciseType] = useState<
    (typeof exerciseTypeOptions)[0] | undefined
  >(exerciseTypeInput);

  const exerciseNameInputRef = useRef(
    exercise ? exercise.name : ""
  );
  const setsInputRef = useRef(
    exercise && exercise.type === "strength"
      ? (exercise as StrengthExercise).sets
      : ''
  );
  const repsInputRef = useRef(
    exercise && exercise.type === "strength"
      ? (exercise as StrengthExercise).reps
      : ''
  );
  const timeInputRef = useRef(
    exercise && exercise.type === "endurance"
      ? (exercise as EnduranceExercise).time
      : ''
  );
  const distanceInputRef = useRef(
    exercise && exercise.type === "endurance"
      ? (exercise as EnduranceExercise).distance
      : ''
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(
      "Exercise Id is ",
      exercise === null ? null : exercise.id
    );
    console.log("Name Input ref value: ", exerciseNameInputRef.current);
    console.log("type value: ", setsInputRef.current);
    console.log("Sets Input ref value: ", exerciseType?.value);
    console.log("reps Input ref value: ", setsInputRef.current);
    console.log("Sets Input ref value: ", repsInputRef.current);

    if (
      exerciseType!.value === "strength" &&
      (exerciseNameInputRef.current === "" ||
        setsInputRef.current === '' ||
        repsInputRef.current === '')
    ) {
      return;
    } else if (
      exerciseType!.value === "endurance" &&
      (exerciseNameInputRef.current === "" ||
        timeInputRef.current === '' ||
        distanceInputRef.current === '')
    ) {
      return;
    }

    const newExercise: Exercise =
      exerciseType?.value === "strength"
        ? new StrengthExercise(
            exercise === null ? null : exercise.id,
            exerciseNameInputRef.current,
            exerciseType.value,
            Number(setsInputRef.current),
            Number(repsInputRef.current)
          )
        : new EnduranceExercise(
            exercise === null ? null : exercise.id,
            exerciseNameInputRef.current,
            exerciseType!.value,
            Number(timeInputRef.current),
            Number(distanceInputRef.current)
          );
    props.addExercise(newExercise);
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <form>
        <div className={styles["main-info"]}>
          <label className={styles["main-info-label"]} htmlFor="exercise-name">
            Name:{" "}
          </label>
          <input
            id="exercise-name"
            defaultValue={exerciseNameInputRef.current}
            onChange={(e) => (exerciseNameInputRef.current = e.target.value)}
            className={styles.name}
            type="text"
            placeholder="Exercise Name"
            required
          />
        </div>
        <div className={styles["main-info"]}>
          <label className={styles["main-info-label"]}>Exercise Type: </label>
          <Select
            options={exerciseTypeOptions}
            value={exerciseType}
            onChange={(o) => setExerciseType(o)}
          />
        </div>

        {exerciseType && (
          <div className={styles["type-info"]}>
            {exerciseType!.value == "strength" && (
              <>
                <input
                  defaultValue={setsInputRef.current}
                  onChange={(e) =>
                    (setsInputRef.current = Number(e.target.value))
                  }
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Sets"
                  required
                />
                <input
                  defaultValue={repsInputRef.current}
                  onChange={(e) =>
                    (repsInputRef.current = Number(e.target.value))
                  }
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Reps"
                  required
                />
              </>
            )}
            {exerciseType!.value == "endurance" && (
              <>
                <input
                  defaultValue={timeInputRef.current}
                  onChange={(e) =>
                    (timeInputRef.current = Number(e.target.value))
                  }
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Time"
                  required
                />
                <input
                  defaultValue={distanceInputRef.current}
                  onChange={(e) =>
                    (distanceInputRef.current = Number(e.target.value))
                  }
                  className={styles["input-item"]}
                  type="number"
                  placeholder="Distance"
                  required
                />
              </>
            )}
          </div>
        )}
        <button onClick={submitHandler}>
          {exercise ? "Update Exercise" : "Add Exercise"}
        </button>

        {exercise && <div className={styles.deleteSection}>
                  <div className={styles.deleteSectionTitle}>Warning</div>
                  <p className={styles.deleteSectionSubtitle}>
                    All trackers for this exercise will be lost
                  </p>
                  <button
                    onClick={deleteExerciseHandler}
                    className={styles.deleteSectionButton}
                  >
                    Delete
                  </button>
                </div>
        }
      </form>
    </Modal>
  );

  function deleteExerciseHandler(e: React.FormEvent) {
    e.preventDefault();
    if(exercise) {
      if(window.confirm("All trackers for this exercise will be lost. Are you sure you want to delete this exercise?")){
        if (exercise.id) {
          fetch(`${API}/exercises/${exercise.id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.token}`,
            }
          }).then((res) => {
            console.log("success!");
            props.deleteExercise(exercise);
            setExercise(null);
            clearForm();
            props.onClose();
          });
        } else {
          props.deleteExercise(exercise);
          setExercise(null);
          clearForm();
          props.onClose();
        }
      }
    }
  }

  function clearForm() {
    repsInputRef.current = "";
    setsInputRef.current = "";
    timeInputRef.current = "";
    distanceInputRef.current = "";
  }
};

export default ExcersiseForm;
