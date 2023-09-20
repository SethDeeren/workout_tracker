import {useState} from "react";
import ExerciseTracker from "../models/exerciseTracker";
import StrengthExerciseTracker from "../models/strengthExerciseTracker";
import AddTrackerForm from "./AddTrackerForm";
import {useTrackerData} from "../store/exercise-tracker-contex";
import {areEqualDates} from "../utility/dateHelper";

import styles from "../pages/styles/MyExerciseTrackerPage.module.css";
import Modal from "./UI/Modal";

type TrackerData = {
    exerciseName: string;
    exerciseType: string;
    currentTrackers: Array<ExerciseTracker>;
    historyTrackers: Array<ExerciseTracker>;
};

const TrackerModalEditor: React.FC<{ historyTrackers: ExerciseTracker[] }> = (props) => {

    const trackerData = useTrackerData();
    const trackerDate: Date | undefined = props.historyTrackers[0].trackerDateAndTime ? props.historyTrackers[0].trackerDateAndTime : undefined;

    return (

        <div
            className={styles.currnetTracker}
        >
            <AddTrackerForm trackerDate={trackerDate}/>

            <div className={styles.currentTrackerCompletedTitle}>Completed</div>
            <ol>
                {/*{props.historyTrackers.filter(tr => tr.trackerDateAndTime ).map((tracker) => (*/}
                {/*    <li key={Math.random() * 100} className={styles.currentTrackerCompletedItem}>*/}
                {/*        weight: {(tracker as StrengthExerciseTracker).weight}, reps:{" "}*/}
                {/*        {(tracker as StrengthExerciseTracker).reps}*/}
                {/*        <button onClick={() => {if(tracker.id !== null) {trackerData.deleteTracker(tracker.id)}}} className={styles.currentTrackerDeleteItemButton}>x</button>*/}
                {/*    </li>*/}
                {/*))}*/}
                {
                    trackerData.trackerData.historyTrackers
                        .filter(tracker => {
                                //return tracker.trackerDateAndTime?.toISOString() === trackerDate?.toISOString()
                                return trackerDate !== undefined && tracker.trackerDateAndTime !== null && areEqualDates(tracker.trackerDateAndTime, trackerDate)
                            }
                        )
                        .map((tracker) =>
                            (
                                <li key={Math.random() * 100} className={styles.currentTrackerCompletedItem}>
                                    weight: {(tracker as StrengthExerciseTracker).weight}, reps:{" "}
                                    {(tracker as StrengthExerciseTracker).reps}
                                    <button onClick={() => {
                                        if (tracker.id !== null) {
                                            trackerData.deleteTracker(tracker.id)
                                        }
                                    }} className={styles.currentTrackerDeleteItemButton}>x
                                    </button>
                                </li>
                            )
                        )
                }
            </ol>
        </div>

    );
};

export default TrackerModalEditor;
