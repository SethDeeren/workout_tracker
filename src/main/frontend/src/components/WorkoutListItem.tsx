import React from 'react';
import WorkoutListItemModel from '../models/workout';
import classes from './styles/List.module.css';



const WorkoutListItem: React.FC<{WorkoutItem: WorkoutListItemModel}> = (props) => {
    return (
        <div className={classes.listItem}>
            <h3 className={classes.ListItemTitle}>{props.WorkoutItem.title}</h3>
            <p className={classes.ListItemDescription}>{props.WorkoutItem.description}</p>
        </div>
    );
}

export default WorkoutListItem;