import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { AuthContext } from "../store/auth-context";
import CurrentExerciseTrackers from "../components/CurrentExerciseTrackers";
import HistoryExerciseTrackers from "../components/HistoryExerciseTrackers";
import ExerciseProgressTracker from "../components/ExerciseProgressTracker";
import styles from "./styles/MyExerciseTrackerPage.module.css";
import ExerciseTracker from "../models/exerciseTracker";
import {isToday} from "../utility/dateHelper";
import {API} from "../config";

import { TrackerDataContext } from "../store/exercise-tracker-contex";

// TODO: used more then once consider moving to models
type TrackerData = {
  exerciseName: string;
  exerciseType: string;
  currentTrackers: Array<ExerciseTracker>;
  historyTrackers: Array<ExerciseTracker>;
  progressTrackers: Array<ExerciseTracker>;
};

const MyExerciseTrackerPage = () => {
  const params = useParams();
  const { isLoading, error, sendRequest: fetchTrackers } = useHttp();
  const authCtx = useContext(AuthContext);

  const [trackerData, setTrackerData] = useState<TrackerData>({
    exerciseName: "",
    exerciseType: "",
    currentTrackers: [],
    historyTrackers: [],
    progressTrackers: [],
  });

  const addTracker = (tracker: ExerciseTracker) => {
   if((tracker.trackerDateAndTime !== null) && (isToday(tracker.trackerDateAndTime))) {
      setTrackerData((prev) => ({
        ...prev,
        currentTrackers: [...prev.currentTrackers, tracker],
      }));
   } else {
     const newHistoryTrackers = [...trackerData.historyTrackers, tracker];
     // @ts-ignore
     newHistoryTrackers.sort((t, t2) => (t!.trackerDateAndTime - t2!.trackerDateAndTime));

      setTrackerData((prev) => ({
        ...prev,
        historyTrackers: [...newHistoryTrackers],
     }));
   }
  };

  const addHistoryTracker = (tracker: ExerciseTracker) => {
    setTrackerData((prev) => ({
      ...prev,
      historyTrackers: [...prev.historyTrackers, tracker],
    }));
  };

  const deleteTracker = (trackerId: string) => {
    fetch(`${API}/trackers/${trackerId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authCtx.token}`,
      }
    }).then((res) => {
      console.log("success!");
      setTrackerData((prev) => ({
        ...prev,
        currentTrackers: [...prev.currentTrackers.filter(tr => tr.id !== trackerId)],
        historyTrackers: [...prev.historyTrackers.filter(tr => tr.id !== trackerId)],
        progressTrackers: [...prev.historyTrackers.filter(tr => tr.id !== trackerId)]
      }));
    });
  }

  const [index, setIndex] = useState(0);

  // Start swiping event
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    console.log("TOUCH START");
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      console.log("swipe", isLeftSwipe ? "left" : "right");
    // add your conditional logic here
    //if swipe left and on history move to add tracker else nothing
    if (isRightSwipe && index === 1) {
      setIndex(0);
    } else if (isRightSwipe && index === 2) {
      setIndex(1);
    } else if (isLeftSwipe && index === 0) {
      setIndex(1);
    } else if (isLeftSwipe && index === 1) {
      setIndex(2);
    }
    // if swipe right and on add tracker move to history else nothing
  };

  useEffect(() => {

    const mapTrackers = (dataParam: TrackerData) => {
      dataParam.historyTrackers.forEach(t => t.trackerDateAndTime = new Date(t.trackerDateAndTime!.toString()));
      dataParam.progressTrackers.forEach(t => t.trackerDateAndTime = new Date(t.trackerDateAndTime!.toString()));
      dataParam.historyTrackers.forEach(t => t.trackerDateAndTime = new Date(t.trackerDateAndTime!.toString()));
      setTrackerData((prevDataTracker) => ({
        ...prevDataTracker,
        exerciseName: dataParam.exerciseName,
        exerciseType: dataParam.exerciseType,
        currentTrackers: dataParam.currentTrackers,
        historyTrackers: dataParam.historyTrackers,
        progressTrackers: dataParam.progressTrackers,
      }));
      console.log(dataParam);
    };
    fetchTrackers(
      {
        url: `${API}/exercises/${params.exerciseId}/tracker`,
        method: null,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: null,
      },
      mapTrackers
    );
  }, [fetchTrackers]);

  return (
    <div
      className={styles.exerciseTrackerPage}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.myExerciseTrackerNav}>
        {/* Look up relative path would be better */}
        <div
          onClick={() => setIndex(0)}
          className={`${styles.exerciseTrackerPageLink} ${
            index === 0 ? styles.active : ""
          }`}
        >
          {trackerData.exerciseName.toLocaleUpperCase()}
        </div>
        <div
          onClick={() => setIndex(1)}
          className={`${styles.exerciseTrackerPageLink} ${
            index === 1 && styles.active
          }`}
        >
          HISTORY
        </div>
        <div
          onClick={() => setIndex(2)}
          className={`${styles.exerciseTrackerPageLink} ${
            index === 2 && styles.active
          }`}
        >
          PROGRESS
        </div>
      </div>
      {/* <Outlet context={trackerData} /> */}
      {/* wrapp in my context provider pass tracker data and add tracker function */}
      <TrackerDataContext.Provider
        value={{ trackerData: trackerData, addTracker: addTracker, deleteTracker: deleteTracker }}
      >
        {index === 0 && (
          <CurrentExerciseTrackers
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        )}
        {index === 1 && (
          <HistoryExerciseTrackers
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        )}
        {index === 2 && (
          <ExerciseProgressTracker
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          />
        )}
      </TrackerDataContext.Provider>

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default MyExerciseTrackerPage;