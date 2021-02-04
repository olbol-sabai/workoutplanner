import React, { useState, useEffect } from 'react';
import { NumberInput, TextInput, DualNumberInput } from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './CreateExcerciseForm.module.css';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import * as workoutActionCreators from '../../../store/actions/workouts';
import * as utilActionCreators from '../../../store/actions/utils';

const CreateExcerciseForm = props => {

    const [exerciseName, setExerciseName] = useState('');
    const [noOfReps, setNoOfReps] = useState(1);
    const [lengthOfRepSeconds, setLengthOfRepSeconds] = useState(30);
    const [lengthOfRepMinutes, setLengthOfRepMinutes] = useState(0);
    const [lengthOfRep, setLengthOfRep] = useState(30)
    const [restBetweenReps, setRestBetweenReps] = useState(30);

    const [noOfSets, setNoOfSets] = useState(1);
    const [restBetweenSets, setRestBetweenSets] = useState(30);

    const [valid, setValid] = useState(false);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (props.workspaceState === 'editingExercise') {
            let ex = props.selectedExercise
            setExerciseName(ex.name)
            setNoOfReps(ex.noOfReps)
            setLengthOfRepSeconds(ex.lengthOfRep % 60)
            setLengthOfRepMinutes(Math.floor(ex.lengthOfRep / 60))
            setRestBetweenReps(ex.restBetweenReps)
            setNoOfSets(ex.noOfSets)
            setRestBetweenSets(ex.restBetweenSets)
        }
    }, []);

    useEffect(() => {
        setLengthOfRep((60 * lengthOfRepMinutes) + lengthOfRepSeconds)
    }, [lengthOfRepSeconds, lengthOfRepMinutes])

    useEffect(() => {
        if (exerciseName === '' || noOfReps < 1 || lengthOfRep < 1 || restBetweenReps < 1 || noOfSets < 1 || restBetweenSets < 1) {
            setValid(false)
        } else setValid(true)
    }, [exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets]);


    const updateExercise = () => {
        props.updateExercise(
            props.selectedExercise.id, exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets
        )
        props.setWorkspaceState('selectedWorkout');
        if (touched) props.saveRequired(true);
    }

    const createExercise = () => {
        props.createExerciseHandler(
            exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets, uuid().toString()
        )
        props.setWorkspaceState('selectedWorkout');
        props.saveRequired(true);
    }

    const cancel = () => {
        props.setWorkspaceState('selectedWorkout');
    }

    return (
        <div className={classes.Exercise}>
            {props.workspaceState === 'editingExercise' ?
                <h1>Editing Exercise</h1> : <h1>Create an Exercise</h1>}
            <TextInput
                value={exerciseName}
                label="Exercise Name"
                changed={(e) => {
                    setTouched(true)
                    setExerciseName(e.target.value)
                }} />
            <div className={classes.Reps}>
                <h4>Reps</h4>
                <NumberInput
                    min="1"
                    label="No. of Reps"
                    value={noOfReps}
                    changed={(e) => {
                        setNoOfReps(Math.floor(e.target.value))
                        setTouched(true)
                    }} />
                <DualNumberInput
                    min="0"
                    minuteMin="0"
                    label="Rep duration"
                    minuteVal={lengthOfRepMinutes}
                    secondVal={lengthOfRepSeconds}
                    secondChanged={(e) => {
                        setLengthOfRepSeconds(Math.floor(e.target.value))
                        setTouched(true)
                    }}
                    minuteChanged={(e) => {
                        setLengthOfRepMinutes(Math.floor(e.target.value))
                        setTouched(true)
                    }}
                />
                {noOfReps > 1 ?
                    <NumberInput
                        min="1"
                        label="Rest between reps"
                        value={restBetweenReps}
                        changed={(e) => {
                            setRestBetweenReps(Math.floor(e.target.value))
                            setTouched(true)
                        }} /> : null}
            </div>
            <div className={classes.Sets}>
                <h4>Sets</h4>
                <NumberInput
                    min="1"
                    label="No. of Sets"
                    value={noOfSets}
                    changed={(e) => {
                        setNoOfSets(Math.floor(e.target.value))
                        setTouched(true)
                    }} />
                {noOfSets > 1 ? <NumberInput
                    min="1"
                    label="Rest between sets"
                    value={restBetweenSets}
                    changed={(e) => {
                        setRestBetweenSets(Math.floor(e.target.value))
                        setTouched(true)
                    }} /> : null}
            </div>
            <div className={classes.Buttons}>
                <Button clicked={cancel}>Cancel</Button>
                {props.workspaceState === 'editingExercise'
                    ? <Button disabled={!valid} clicked={updateExercise}>Done</Button>
                    : <Button disabled={!valid} clicked={createExercise}>Add New Exercise</Button>}
            </div>

        </div>)
}


const mapStateToProps = state => {
    return {
        selectedExercise: state.util.selectedExercise,
        workspaceState: state.util.workspaceState,
        saveRequired: state.util.saveRequired,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createExerciseHandler: (exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets, id) => dispatch(workoutActionCreators.createExercise(exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets, id)),
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),
        updateExercise: (id, exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets) =>
            dispatch(utilActionCreators.updateExercise(id, exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets)),
        saveRequired: (bool) => dispatch(utilActionCreators.saveRequired(bool)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExcerciseForm);

