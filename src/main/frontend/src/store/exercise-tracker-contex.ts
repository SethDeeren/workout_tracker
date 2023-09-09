import React, { useState, useContext } from "react";
import ExerciseTracker from "../models/exerciseTracker";

type TrackerData = {
    exerciseName: string;
    exerciseType: string;
    currentTrackers: Array<ExerciseTracker>;
    historyTrackers: Array<ExerciseTracker>;
    progressTrackers: Array<ExerciseTracker>;
};

type TrackerDataObj = {
  trackerData: TrackerData;
  addTracker: (tracker: ExerciseTracker) => void;
  deleteTracker: (trackerId: string) => void;
};

// this is only the initial data, needed to set the type of the context
// the value will be changed later in the provider
export const TrackerDataContext = React.createContext<TrackerDataObj | undefined>(undefined);


export function useTrackerData() {
    const trackerData = useContext(TrackerDataContext);
    if(trackerData === undefined) {
        throw new Error("tracker data must be defined");
    }
    return trackerData;
}