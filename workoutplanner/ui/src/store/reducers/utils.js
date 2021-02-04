import React from 'react';

const initialState = {
    workspaceState: 'login/register',
    saveRequired: false,
    selectedExercise: {},
    selectedWorkout: {
        exercises: [],
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('SET_WORKSPACE_STATE'): return {...state, workspaceState: action.state}
        case ('SET_SELECTED_EXERCISE'): {
            return {
                ...state, 
                    selectedExercise: {
                        id: action.id, 
                        name: action.name,
                        noOfSets: action.noOfSets,
                        noOfReps: action.noOfReps,
                        lengthOfRep: action.lengthOfRep,
                        restBetweenReps: action.restBetweenReps,
                        restBetweenSets: action.restBetweenSets,
                    }}
        }
        case ('SAVE_REQUIRED'): return {...state, saveRequired: action.bool}
        case ('SET_WORKSPACE_WORKOUT'): return {...state, selectedWorkout: action.workout}
        case ('SWITCH_EXERCISES'): {
            const newEx = [...state.selectedWorkout.exercises]
            const [source] = newEx.splice(action.id1, 1)
            newEx.splice(action.id2, 0, source)
            return {
                ...state, selectedWorkout: {
                    ...state.selectedWorkout, exercises: newEx
                }
            }
        }
        case ('UPDATE_EXERCISE'): {
            let index = state.selectedWorkout.exercises.findIndex(ex => ex.id === action.id)
            let newEx = {
                name: action.exerciseName,
                noOfReps: +action.noOfReps,
                lengthOfRep: +action.lengthOfRep,
                restBetweenReps: +action.noOfReps > 1 ? Math.floor(+action.restBetweenReps) : 1,
                noOfSets: +action.noOfSets,
                restBetweenSets: +action.noOfSets > 1 ? Math.floor(+action.restBetweenSets) : 1,
                id: action.id
            }
            let allExs = [...state.selectedWorkout.exercises];
            allExs[index] = newEx
            return {...state, selectedWorkout: {
                ...state.selectedWorkout, exercises: allExs,
            }}
        }
        case ('CREATE_EXERCISE'): {
            return {
                ...state, selectedWorkout: {
                    ...state.selectedWorkout, exercises: state.selectedWorkout.exercises.concat([{
                        name: action.exerciseName,
                        noOfReps: +action.noOfReps,
                        lengthOfRep: +action.lengthOfRep,
                        restBetweenReps: +action.noOfReps > 1 ? Math.floor(+action.restBetweenReps) : 1,
                        noOfSets: +action.noOfSets,
                        restBetweenSets: +action.noOfSets > 1 ? Math.floor(+action.restBetweenSets) : 1,
                        id: action.id
                    }])
                    }
                }
        }
        case ('DELETE_EXERCISE'): {
            let updatedExercises = state.selectedWorkout.exercises.filter(ex => ex.id !== action.id)
            return {
                ...state, selectedWorkout: {
                    ...state.selectedWorkout, exercises: updatedExercises
                    }
                }
        }
        case ('UPDATE_WORKOUT'): {
            return {
                ...state, selectedWorkout: {
                    ...state.selectedWorkout,
                        cycles: Math.floor(+action.cycles),
                        restBetweenCycles: Math.floor(+action.restBetweenCycles),
                        restBetweenExercises: Math.floor(+action.restBetweenExercises),
                    }
                }
        }
        default: return state
    }
}

export default reducer

