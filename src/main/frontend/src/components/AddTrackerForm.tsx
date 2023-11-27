import React, { useRef, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Exercise from "../models/exercise";
import StrengthExercise from "../models/exercise";
import ExerciseTracker from "../models/exerciseTracker";
import StrengthExerciseTracker from "../models/strengthExerciseTracker";
import EnduranceExerciseTracker from "../models/enduranceExerciseTracker";
import { AuthContext } from "../store/auth-context";
import { useTrackerData } from "../store/exercise-tracker-contex";
import {API} from "../config";

import styles from "../pages/styles/MyExerciseTrackerPage.module.css";

const AddTrackerForm: React.FC<{trackerDate?: Date}> = (props) => {

  const trackerData = useTrackerData();

  const weightRef = useRef<HTMLInputElement>(null);
  const repsRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const distanceRef = useRef<HTMLInputElement>(null);
  const exerciseTracker =
    trackerData.trackerData.exerciseType === "strength"
      ? new StrengthExerciseTracker(null,0, 0, null)
      : new EnduranceExerciseTracker(null, 0, 0, null);

  const [tracker, setTracker] = useState(exerciseTracker);

  const authCtx = useContext(AuthContext);
  const params = useParams();
  const exerciseId = params.exerciseId;

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredWeight = weightRef.current?.value;
    const enteredReps = repsRef.current?.value;
    const enteredTime = timeRef.current?.value;
    const enteredDistance = distanceRef.current?.value;

    const requestBody =
    trackerData.trackerData.exerciseType === "strength"
        ? { type: "strength", weight: enteredWeight, reps: enteredReps, trackerDateAndTime: props.trackerDate }
        : { type: "endurance", time: enteredTime, distance: enteredDistance, trackerDateAndTime: props.trackerDate };
    const response = await fetch(`${API}/exercises/${exerciseId}/trackers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      },
      body: JSON.stringify(requestBody),
    });


      const newExerciseTracker: ExerciseTracker = await response.json();
      newExerciseTracker.trackerDateAndTime = new Date(newExerciseTracker.trackerDateAndTime!.toString())
      console.log("success!");
     //if(!props.trackerDate) {
       trackerData.addTracker(newExerciseTracker);

     //}
     clearForm();

  };

  const clearForm = () => {
    if (trackerData.trackerData.exerciseType === "strength") {
      weightRef.current!.value = "";
      repsRef.current!.value = "";
    } else {
      timeRef.current!.value = "";
      distanceRef.current!.value = "";
    }
  };

  const weightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTracker(
      (prev) =>
        new StrengthExerciseTracker(
            null,
          Number(e.target.value),
          (prev as StrengthExerciseTracker).reps,
          null
        )
    );
  };
  const repInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTracker(
      (prev) =>
        new StrengthExerciseTracker(
            null,
          (prev as StrengthExerciseTracker).weight,
          Number(e.target.value),
          null
        )
    );
  };
  const timeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTracker(
      (prev) =>
        new EnduranceExerciseTracker(
            null,
          Number(e.target.value),
          (prev as EnduranceExerciseTracker).distance,
          null
        )
    );
  };
  const distanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTracker(
      (prev) =>
        new EnduranceExerciseTracker(
            null,
          (prev as EnduranceExerciseTracker).time,
          Number(e.target.value),
          null
        )
    );
  };
  //   const repInputChange = (reps: number) => {setTracker(prev => {{...prev, reps:reps}})};
  //   const timeInputChange = (time: number) => {setTracker(prev => {{...prev, time:time}})};
  //   const distanceInputChange = (distance: number) => {setTracker(prev => {{...prev, distance:distance}})};

  return (
    <form className={styles.addTrackerForm} onSubmit={onSubmitHandler}>
      {trackerData.trackerData.exerciseType === "strength" && (
        <>
          <div className={styles.addTrackerInputGroupTitle}>Add Set</div>
          <div className={styles.addTrackerInputGroup}>
            <input
              onChange={weightInputChange}
              type="number" step="any"
              ref={weightRef}
              required
            />
            <label htmlFor="">Weight</label>
            <input
              onChange={repInputChange} type="number"
              ref={repsRef}
              required
            />
            <label htmlFor="">Reps</label>
            <button className={styles.addTrackerFormSubmittButton}>+</button>
          </div>
        </>
      )}
      {trackerData.trackerData.exerciseType === "endurance" && (
        <>
          <div className={styles.addTrackerInputGroupTitle}>
            Tracker time and distance
          </div>
          <div className={styles.addTrackerInputGroup}>
            <input onChange={timeInputChange} type="number" ref={timeRef} />
            <label htmlFor="">time</label>
            <input
              onChange={distanceInputChange} type="number"
              ref={distanceRef}
            />
            <label htmlFor="">distance</label>
            <button className={styles.addTrackerFormSubmittButton}>+</button>
          </div>
        </>
      )}
    </form>
  );
};

export default AddTrackerForm;
