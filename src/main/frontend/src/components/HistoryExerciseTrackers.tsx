import ExerciseTracker from "../models/exerciseTracker";
import StrengthExerciseTracker from "../models/strengthExerciseTracker";
import { useTrackerData } from "../store/exercise-tracker-contex";

import styles from "../pages/styles/MyExerciseTrackerPage.module.css";

type TrackerData = {
  exerciseName: string;
  currentTrackers: Array<ExerciseTracker>;
  historyTrackers: Array<ExerciseTracker>;
};

const HistoryExerciseTrackers: React.FC<{
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}> = (props) => {
  const trackerContext = useTrackerData();

  let trackerDay: Date | null =
  trackerContext.trackerData.historyTrackers.length > 0 ? trackerContext.trackerData.historyTrackers[0].trackerDateAndTime: null;

  return (
    <div className={styles.historyTrackerList}
      onTouchStart={props.onTouchStart}
      onTouchMove={props.onTouchMove}
      onTouchEnd={props.onTouchEnd}
    >
      <div>
        <div className={styles.historyTrackerHeaderDate}>{trackerDay?.toDateString()}</div>
        {trackerContext.trackerData.historyTrackers.map(
          (tracker: ExerciseTracker) => {
            if (
              tracker.trackerDateAndTime!.getDate() === trackerDay?.getDate() &&
              tracker.trackerDateAndTime?.getFullYear() === trackerDay?.getFullYear()
            ) {
              return (
                <div key={Math.random() * 100}>
                  weight: {(tracker as StrengthExerciseTracker).weight}, reps:{" "}
                  {(tracker as StrengthExerciseTracker).reps}{" "}
                </div>
              );
            } else {
              trackerDay = tracker.trackerDateAndTime;
              return (
                <>
                <div className={styles.historyTrackerHeaderDate}>{trackerDay?.toDateString()}</div>
                <div key={Math.random() * 100}>
                  weight: {(tracker as StrengthExerciseTracker).weight}, reps:{" "}
                  {(tracker as StrengthExerciseTracker).reps}{" "}
                </div>
                </>
              );
            }
          }
        )}
      </div>
    </div>
  );
};

export default HistoryExerciseTrackers;
