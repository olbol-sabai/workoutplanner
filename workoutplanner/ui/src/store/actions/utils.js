import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setWorkspaceState = (state) => {
    return {
        type: actionTypes.SET_WORKSPACE_STATE,
        state: state,
    }
}

export const deleteExercise = (id) => {
    return {
        type: actionTypes.DELETE_EXERCISE, id
    }
}

const fetchWorkouts = (data) => {
    return {
        type: actionTypes.INITIALISE_WORKOUTS_FROM_FIREBASE, data
    }
}


export const asyncFetchWorkouts = (token) => {
    return dispatch => {
        const headers = {
            Authorization: `JWT ${token}`
        }
        axios('http://127.0.0.1:8000/api/workouts/', {headers: headers})
        .then(res => {
            dispatch(fetchWorkouts(res.data.results))
        })
        .catch(err => console.log(err.response))

    }
}

export const updateExercise = (id, exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets) => {
    return {
        type: actionTypes.UPDATE_EXERCISE,
        id, exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets
    }
}

export const selectWorkoutHandler = (workout) => {
    return {
        type: actionTypes.SET_WORKSPACE_WORKOUT,
        workout,
    }
}

export const updateWorkout = (cycles, restBetweenExercises, restBetweenCycles) => {
    return {
        type: actionTypes.UPDATE_WORKOUT, cycles, restBetweenExercises, restBetweenCycles
    }
}

export const selectExerciseHandler = (id, name, noOfSets, noOfReps, lengthOfRep, restBetweenReps, restBetweenSets) => {
    return {
        type: actionTypes.SET_SELECTED_EXERCISE,
        id, name, noOfSets, noOfReps, lengthOfRep, restBetweenReps, restBetweenSets,
    }
}

export const switchExercises = (id1, id2) => {
    return {
        type: actionTypes.SWITCH_EXERCISES,
        id1, id2
    }
}

export const saveRequired = (bool) => {
    return {
        type: actionTypes.SAVE_REQUIRED,
        bool
    }
}

