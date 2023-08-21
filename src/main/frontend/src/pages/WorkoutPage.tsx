import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useHttp from '../hooks/use-http';
import EnduranceExercise from '../models/enduranceExercise';
import StrengthExercise from '../models/strengthExercise';
import Workout from "../models/workout";
import { API } from '../config';

import styles from "./styles/WorkoutPage.module.css";



const WorkoutPage: React.FC = (props) => {
    const params = useParams();
    const [workout, setWorkout] = useState<Workout>();
    const { isLoading, error, sendRequest: fetchWorkout } = useHttp();

    useEffect(() => {
        const mapWorkout = (workoutParam: Workout) => {
            setWorkout(workoutParam);
        }
        fetchWorkout(
            {
                url: `${API}/workouts/${params.id}`,
                method: null,
                headers: null,
                body: null
            },
            mapWorkout
        )
    }, [fetchWorkout]);

    return (
        <div className={styles.container}>
            <div className={styles['workout-header']}>
                <h2 className={styles['workout-title']}>{workout?.title}</h2>
                <p className={styles['workout-credits']}>By:Seth 01/01/2023</p>
            </div>

            <p className={styles['workout-description']}>{`${"\t" + workout?.description}`}</p>
            <table className={styles.exercises}>
                <tbody>
                    {workout?.exercises.map((ex => (
                        <tr>
                            {ex.type === "strength" && `${ex.name} ${(ex as StrengthExercise).sets} sets of ${(ex as StrengthExercise).reps}`}
                            {ex.type === "endurace" && `${ex.name} ${(ex as EnduranceExercise).time} or ${(ex as EnduranceExercise).distance}`}
                        </tr>
                    )))}
                </tbody>
            </table>
            <div>
                <button>Add To My Workouts</button>
            </div>

        </div>
    )
}

export default WorkoutPage;