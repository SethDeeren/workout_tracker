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

const ExerciseProgressLineChart: React.FC<{
    option: "set" | "day" | "week",
    type: "Volume" | "Weight" | "Reps"
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
                label: props.type,
                data: getData(),
                backgroundColor: "#9fcbee",
                border: "#01016f",
                borderWidth: 1,
            }
        ]
    });

    return (
            <div style={{width: "90%", margin: "auto", marginTop: 100}}>
                <h4 style={{width: "90%", margin: "auto", padding: 20, textAlign: "center"}} >{props.type}</h4>
                <Line data={userData} options={{
                    plugins: {
                        legend: {
                            display: true,
                        },
                    }
                }}/>
            </div>
    );

    function getData() {
        const trackers = trackerContext.trackerData.progressTrackers;
        let data: number[] = [];
        if (props.option === "set") {
            if (props.type === "Volume") {
                data = trackers.map(trk => (
                    (trk as StrengthExerciseTracker).weight * (trk as StrengthExerciseTracker).reps
                ))
            } else if (props.type === "Weight") {
                data = trackers.map(trk => (trk as StrengthExerciseTracker).weight)
            } else if (props.type === "Reps") {
                data = trackers.map(trk => (trk as StrengthExerciseTracker).reps)
            }
        } else if (props.option === "day") {
            if (props.type === "Volume") {

            } else if (props.type === "Weight") {

            } else if (props.type === "Reps") {

            }
        } else {
            if (props.type === "Volume") {

            } else if (props.type === "Weight") {

            } else if (props.type === "Reps") {

            }
        }

        return data;
    }
}

export default ExerciseProgressLineChart;
