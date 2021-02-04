import * as actionTypes from './actionTypes'


export const createWorkout = (workoutName, cycles, id) => {
    return {
        type: actionTypes.CREATE_WORKOUT,
        workoutName, cycles, id,
    }
}

export const createExercise = (exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets, id) => {
    return {
        type: actionTypes.CREATE_EXERCISE,
        exerciseName, noOfReps, lengthOfRep, restBetweenReps, noOfSets, restBetweenSets, id
    }
}

export const clearWorkouts = () => {
    return {
        type: actionTypes.CLEAR_WORKOUTS
    }
}
