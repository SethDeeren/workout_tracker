import ExerciseTracker from "../models/exerciseTracker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import StrengthExerciseTracker from "../models/strengthExerciseTracker";
import {useTrackerData} from "../store/exercise-tracker-contex";

import styles from "../pages/styles/MyExerciseTrackerPage.module.css";
import React, {useState} from "react";
import Modal from "./UI/Modal";
import TrackerModalEditor from "./TrackerModalEditor";

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
    const [displayModal, setDisplayModal] = useState(false);

    let trackerDay: Date | null =
        trackerContext.trackerData.historyTrackers.length > 0 ? trackerContext.trackerData.historyTrackers[0].trackerDateAndTime : null;
    const [editableTrackers, setEditableTrackers] = useState<ExerciseTracker[]>([])
    const showEditor = (trackerDate: Date | null) => {

        const newEditableTrackers =
            trackerContext.trackerData.historyTrackers.filter(tracker => {
                return tracker.trackerDateAndTime?.toISOString() === trackerDate?.toISOString()
            });
        setEditableTrackers(newEditableTrackers);
        setDisplayModal(true);
    }

    return (
        <div className={styles.historyTrackerList}
             onTouchStart={props.onTouchStart}
             onTouchMove={props.onTouchMove}
             onTouchEnd={props.onTouchEnd}
        >
            <div>
                {displayModal &&
                    <Modal onClose={() => {
                        setDisplayModal(false)
                    }}>
                        <TrackerModalEditor historyTrackers={editableTrackers}/>
                    </Modal>
                }
                <div onClick={() => showEditor(trackerContext.trackerData.historyTrackers[0].trackerDateAndTime)}
                     className={styles.historyTrackerHeaderDate}>{trackerDay?.toDateString()} <FontAwesomeIcon
                    icon={faPenToSquare}/></div>
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
                                    <div onClick={() => showEditor(tracker.trackerDateAndTime)}
                                         className={styles.historyTrackerHeaderDate}>{trackerDay?.toDateString()} <FontAwesomeIcon icon={faPenToSquare}/></div>
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
