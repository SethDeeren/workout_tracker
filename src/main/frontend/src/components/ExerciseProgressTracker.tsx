import React, {useState, useEffect} from "react";
import {useTrackerData} from "../store/exercise-tracker-contex";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x-axis related
    LinearScale, // y-axis related
    PointElement
} from "chart.js";
import ExerciseTracker from "../models/exerciseTracker";
import StrengthExerciseTracker from "../models/strengthExerciseTracker";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const ExerciseProgressTracker: React.FC<{
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
}> = (props) => {

    const trackerContext = useTrackerData();

    const [userData, setUserData] = useState({
        labels: trackerContext.trackerData.progressTrackers
            .map(
                tracker => {
                    let iso = tracker.trackerDateAndTime?.toISOString();
                   return `${iso?.substring(5,7)}/${iso?.substring(8,10)}/${iso?.substring(2,4)}`
                }
            ),
        datasets: [
            {
                label: "Users Gained",
                data: trackerContext.trackerData.progressTrackers.map(tracker => (tracker as StrengthExerciseTracker).weight),
                backgroundColor: "#9fcbee",
                border: "#01016f",
                borderWidth: 1,
            }
        ]
    });

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <div
            onTouchStart={props.onTouchStart}
            onTouchMove={props.onTouchMove}
            onTouchEnd={props.onTouchEnd}
        >
            <div style={{width: "90%", margin: "auto", marginTop: 100}}>
                <Line data={userData}/>
            </div>
        </div>
    );
};

export default ExerciseProgressTracker;
