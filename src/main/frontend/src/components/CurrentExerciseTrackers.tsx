import { useState } from "react";
import ExerciseTracker from "../models/exerciseTracker";
import StrengthExerciseTracker from "../models/strengthExerciseTracker";
import AddTrackerForm from "./AddTrackerForm";
import { useTrackerData } from "../store/exercise-tracker-contex";

import styles from "../pages/styles/MyExerciseTrackerPage.module.css";

type TrackerData = {
  exerciseName: string;
  exerciseType: string;
  currentTrackers: Array<ExerciseTracker>;
  historyTrackers: Array<ExerciseTracker>;
};

const CurrentExerciseTrackers: React.FC<{
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}> = (props) => {

  const trackerData = useTrackerData();

  return (
    <div
      className={styles.currnetTracker}
      onTouchStart={props.onTouchStart}
      onTouchMove={props.onTouchMove}
      onTouchEnd={props.onTouchEnd}
    >
      <AddTrackerForm/>

      <div className={styles.currentTrackerCompletedTitle}>Completed</div>
      <ol>
        {trackerData.trackerData.currentTrackers.map((tracker) => (
          <li key={Math.random() * 100} className={styles.currentTrackerCompletedItem}>
            weight: {(tracker as StrengthExerciseTracker).weight}, reps:{" "}
            {(tracker as StrengthExerciseTracker).reps}
            <button onClick={() => {if(tracker.id !== null) {trackerData.deleteTracker(tracker.id)}}} className={styles.currentTrackerDeleteItemButton}>x</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CurrentExerciseTrackers;
