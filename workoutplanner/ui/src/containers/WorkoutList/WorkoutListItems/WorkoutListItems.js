import React, { useEffect, useState } from 'react';
import classes from './WorkoutListItems.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faClock, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as utilActionCreators from '../../../store/actions/utils'

const WorkoutListItems = props => {


    const cycleElement = <FontAwesomeIcon icon={faAtom} size="sm" />
    const durationElement = <FontAwesomeIcon icon={faClock} size="sm" />
    const exerciseCountElement = <FontAwesomeIcon icon={faDumbbell} size="sm" />
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        calculateDuration()
    }, [])

    const calculateDuration = () => {
        let totalOfOneCycle = 0;
        let workout = props.workout
        //calculate total exercise
        for (let ex of workout.exercises) {
            let repLength = ex.lengthOfRep * ex.noOfReps
            let lengthOfRestBetweenReps = ex.restBetweenReps * (ex.noOfReps - 1)
            let exLength = ((repLength + lengthOfRestBetweenReps) * ex.noOfSets) + ((ex.noOfSets - 1) * (ex.restBetweenSets))
            totalOfOneCycle += exLength
        }
        totalOfOneCycle += ((workout.exercises.length - 1) * workout.restBetweenExercises)

        let totalCycles = (totalOfOneCycle * workout.cycles) + ((workout.cycles - 1) * workout.restBetweenCycles)
        setDuration(Math.ceil(totalCycles / 60))
    }

    const workOutSelected = () => {
        props.selectWorkoutHandler(props.workout)
        props.setWorkspaceState('selectedWorkout')
        props.setSaveRequired(false)
    }

    return (
        <div className={classes.ListItem} onClick={workOutSelected}>
            <h5 className={classes.Name}>
                {props.workoutName.length > 10 ? props.workoutName.slice(0, 10) + '...' : props.workoutName}
            </h5>
            <div className={classes.Duration}>
                {durationElement} {' '}
                {duration}
            </div>
            <div className={classes.Cycles}>
                {cycleElement}  {' '}
                {props.cycles}
            </div>
            <div className={classes.Count}>
                {props.exerciseCount}  {' '}
                {exerciseCountElement}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        workspaceState: state.util.workspaceState,
        workouts: state.workout.workouts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        selectWorkoutHandler: (workout) => dispatch(utilActionCreators.selectWorkoutHandler(workout)),
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),
        setSaveRequired: (bool) => dispatch(utilActionCreators.saveRequired(bool)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutListItems);

