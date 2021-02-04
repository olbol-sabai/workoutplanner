import React, { useState, useEffect } from 'react';
import { NumberInput, DualNumberInput } from '../../../../components/UI/Input/Input';


const EditWorkoutForm = ({ workout, setSaveRequired, updateWorkout }) => {


    const [cycles, setCycles] = useState(workout.cycles);
    const [lengthBetweenCycleSeconds, setLengthBetweenCycleSeconds] = useState(30);
    const [lengthBetweenCycleMinutes, setLengthBetweenCycleMinutes] = useState(0);

    const [lengthBetweenExercisesSeconds, setLengthBetweenExercisesSeconds] = useState(30);
    const [lengthBetweenExercisesMinutes, setLengthBetweenExercisesMinutes] = useState(0);


    useEffect(() => {
        if ((lengthBetweenCycleMinutes <= 0 && lengthBetweenCycleSeconds <= 0) || (lengthBetweenExercisesMinutes <= 0 && lengthBetweenExercisesSeconds <= 0)) {
        } else {
            updateWorkout(
                cycles,
                (Number(lengthBetweenExercisesMinutes * 60)) + Number(lengthBetweenExercisesSeconds),
                (Number(lengthBetweenCycleMinutes * 60)) + Number(lengthBetweenCycleSeconds))
        }
    }, [cycles,
        lengthBetweenCycleMinutes,
        lengthBetweenCycleSeconds,
        lengthBetweenExercisesMinutes,
        lengthBetweenExercisesSeconds])


    useEffect(() => {
        setCycles(workout.cycles)
        setLengthBetweenCycleSeconds(workout.restBetweenCycles % 60)
        setLengthBetweenCycleMinutes(Math.floor(workout.restBetweenCycles / 60))
        setLengthBetweenExercisesSeconds(workout.restBetweenExercises % 60)
        setLengthBetweenExercisesMinutes(Math.floor(workout.restBetweenExercises / 60))

    }, [workout])

    return (
        <div>
            <NumberInput
                min="1"
                label="Workout Cycles"
                value={cycles}
                changed={(e) => {
                    setCycles(e.target.value)
                    setSaveRequired(true)
                }
                } />
            {cycles > 1 ? <DualNumberInput
                min="1"
                minuteMin="0"
                label="Rest Between Cycles"
                minuteVal={lengthBetweenCycleMinutes}
                secondVal={lengthBetweenCycleSeconds}
                minuteChanged={(e) => {
                    setLengthBetweenCycleMinutes(e.target.value)
                    setSaveRequired(true)
                }}
                secondChanged={(e) => {
                    setLengthBetweenCycleSeconds(e.target.value)
                    setSaveRequired(true)
                }} />
                : null}
            {workout.exercises.length > 1 ?
                <DualNumberInput
                    minuteMin="0"
                    min="1"
                    label="Rest Between Exercises"
                    minuteVal={lengthBetweenExercisesMinutes}
                    secondVal={lengthBetweenExercisesSeconds}
                    minuteChanged={(e) => {
                        setLengthBetweenExercisesMinutes(e.target.value)
                        setSaveRequired(true)
                    }}
                    secondChanged={(e) => {
                        setLengthBetweenExercisesSeconds(e.target.value)
                        setSaveRequired(true)
                    }} />
                : null}

        </div>
    )
}

export default EditWorkoutForm;