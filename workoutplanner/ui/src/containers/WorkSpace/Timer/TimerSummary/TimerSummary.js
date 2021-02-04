import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-solid-svg-icons';
import classes from './TimerSummary.module.css';
import Clock from '../Clock/Clock';

const TimerSummary = props => {

    let summary = (
        <div>
            {(props.CEI ) + ((props.currentCycle - 1) * props.totalExercises)} / {props.totalExercises * props.totalCycles}
        </div>
        )

    let clockcount;
    let restState;

    switch(props.workoutState) {
        case ('countdown'): restState = 'countdown'; clockcount = props.countdown; break;
        case ('reps'): restState = 'work'; clockcount = props.timeLeftOfRep; break;
        case ('rest between reps'): restState = 'rest'; clockcount = props.timeLeftOfRestBetweenReps; break;
        case ('rest between sets'): restState = 'rest'; clockcount = props.timeLeftOfRest;  break;
        case ('rest between cycles'): restState = 'rest'; clockcount = props.timeLeftOfRestBetweenCycles; break;
        case ('rest between exercises'): restState = 'rest'; clockcount = props.timeLeftOfRestBetweenExercises; break;
        default:
            throw Error({message: 'crikey'})
    }

    let clockStyles = restState ? classes.RestState : classes.RepState;

    return (
        <div className={classes.SummaryContainer}>
            <Clock 
                workoutState={props.workoutState} 
                clockcount={clockcount} 
                restState={restState}/>
            <div className={classes.Boxes}>
                <div className={classes.Box}>
                    <h6 className={classes.Title}>Exercise</h6>
                    <div className={classes.Stats}>{summary}</div>
                </div>
                <div className={classes.Box}>
                    <h2 className={classes.Title}>Reps</h2>
                    <h3 className={classes.Stats}>{props.currentRep} / {props.noOfReps}</h3>
                </div>
                <div className={classes.Box}>
                    <h2 className={classes.Title}>Sets</h2>
                    <h3 className={classes.Stats}>{props.currentSet} / {props.noOfSets}</h3>
                </div>
                <div className={classes.Box}>
                    <h6 className={classes.Title}>Cycle</h6>
                    <p className={classes.Stats}>{props.currentCycle} / {props.totalCycles}</p>
                </div>
            </div>
        </div>
    )
}

export default TimerSummary;