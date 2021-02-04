import React from 'react';

const initialState = {
    workouts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ('CREATE_WORKOUT'): {
            return {
                ...state, workouts: [
                    ...state.workouts.concat([{
                        id: action.id,
                        cycles: 1,
                        name: action.workoutName,
                        exercises: [],
                        restBetweenExercises: 30,
                        restBetweenCycles: 30
                    }])
                ]}
            }
        case ('INITIALISE_WORKOUTS_FROM_FIREBASE'): {
            return {...state, workouts:  Object.values(action.data) }
        }
        case ('CLEAR_WORKOUTS'): {
            return {...state, workouts: [] }
        }
        default: return state
    }
}

export default reducer


// [{
//     id: 6798, 
//     cycles: 2, 
//     name: 'test1', 
//     restBetweenExcercises: 3,
//     restBetweenCycles: 10,
//     exercises: [{
//         id: '76',
//         name: 'Floor Dish Tuck',
//         noOfSets: 1,
//         noOfReps: 1,
//         lengthOfRep: 5,
//         restBetweenReps: 0,
//         restBetweenSets: 0
//     },{
//         id:'7687',
//         name: 'Weighted Turns',
//         noOfSets: 1,
//         noOfReps: 2,
//         lengthOfRep: 5,
//         restBetweenReps: 3,
//         restBetweenSets: 1
//     },{
//         id: '687',
//         name: 'SpiderMan Plank',
//         noOfSets: 2,
//         noOfReps: 1,
//         lengthOfRep: 5,
//         restBetweenReps: 3,
//         restBetweenSets: 5
//     }]},
//     {id: 6738, cycles: 1, name: 'test1i89669697697', restBetweenExcercises: 3,
//     restBetweenCycles: 10, exercises: []},
