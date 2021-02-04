import React, { useState, useEffect, useCallback } from 'react';
import TimerControls from './TimerControls/TimerControls';
import TimerSummary from './TimerSummary/TimerSummary';
import classes from './Timer.module.css';


const Timer = props => {

    const totalCycles = props.selectedWorkout.cycles;
    const [currentCycle, setCurrentCycle] = useState(1);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const totalExercises = props.selectedWorkout.exercises.length;
    const [SWE, setSWE] = useState(props.selectedWorkout.exercises[currentExerciseIndex])

    const [countdown, setCountdown] = useState(10);
    const [paused, setPaused] = useState(true);

    const [currentSet, setCurrentSet] = useState(1);
    const noOfSets = SWE.noOfSets;

    const [currentRep, setCurrentRep] = useState(1);
    const lengthOfRep = SWE.lengthOfRep;

    const [timeLeftOfRep, setTimeLeftOfRep] = useState(lengthOfRep);
    const noofReps = SWE.noOfReps;

    const restLength = SWE.restBetweenSets;
    const [timeLeftOfRest, setTimeLeftOfRest] = useState(restLength);

    const restLengthBetweenReps = SWE.restBetweenReps;
    const [timeLeftOfRestBetweenReps, setTimeLeftOfRestBetweenReps] = useState(restLengthBetweenReps);

    const restLengthBetweenExercises = props.selectedWorkout.restBetweenExercises;
    const [timeLeftOfRestBetweenExercises, setTimeLeftOfRestBetweenExercises] = useState(restLengthBetweenExercises);

    const restLengthBetweenCycles = props.selectedWorkout.restBetweenCycles;
    const [timeLeftOfRestBetweenCycles, setTimeLeftOfRestBetweenCycles] = useState(restLengthBetweenCycles);

    const [currentInterval, setCurrentInterval] = useState(null);

    const [workoutFinished, setWorkoutFinished] = useState(false);
    const [exerciseFinished, setExerciseFinished] = useState(false);
    const [cycleFinished, setCycleFinished] = useState(false);
    const [workoutState, setWorkoutState] = useState('countdown');


    ///COUNTDOWN
    useEffect(() => {
        if (countdown === 0) {
            clearInterval(currentInterval)
            beginSet()
        }
    }, [countdown])


    const beginCountdown = () => {
        const myCountdownTimer = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        setCurrentInterval(myCountdownTimer)
    }

    useEffect(() => {
        setSWE(props.selectedWorkout.exercises[currentExerciseIndex])
    }, [currentExerciseIndex])

    useEffect(() => {
        if (workoutState !== 'countdown') beginSet()
    }, [SWE])

    ////rest between exercises
    useEffect(() => {
        if (timeLeftOfRestBetweenExercises === 0) {
            clearInterval(currentInterval)
            setCurrentExerciseIndex(prev => prev + 1)
            setCurrentSet(1)
            setCurrentRep(1)
            setTimeLeftOfRestBetweenExercises(restLengthBetweenExercises)
        }
    }, [timeLeftOfRestBetweenExercises])


    const beginNextExercise = () => {
        setWorkoutState('rest between exercises')
        const myRestBetweenExerciseTimer = setInterval(() => {
            setTimeLeftOfRestBetweenExercises(prev => prev - 1)
        }, 1000)
        setCurrentInterval(myRestBetweenExerciseTimer);
    }


    useEffect(() => {
        if (timeLeftOfRestBetweenCycles === 0) {
            setTimeLeftOfRestBetweenCycles(restLengthBetweenCycles)
            setCurrentCycle(prev => prev + 1)
            setCurrentExerciseIndex(0)
            beginSet()
        }
    }, [timeLeftOfRestBetweenCycles])


    //// CYCLES
    const beginNextCycle = () => {
        if (currentCycle === totalCycles) {
            setWorkoutFinished(true)
        } else {
            setTimeLeftOfRep(lengthOfRep)
            setWorkoutState('rest between cycles')
            setCurrentSet(1)
            setCurrentRep(1)
            const myRestBetweenCycleTimer = setInterval(() => {
                setTimeLeftOfRestBetweenCycles(prev => prev - 1)
            }, 1000)
            setCurrentInterval(myRestBetweenCycleTimer);
        }
    }

    ///REPS
    useEffect(() => {
        if (timeLeftOfRep === 0) {
            clearInterval(currentInterval)
            setTimeLeftOfRep(lengthOfRep)
            //check of whther the exercise is still going
            if (currentSet !== noOfSets || currentRep !== noofReps) {
                if (currentRep < noofReps) {
                    setTimeLeftOfRestBetweenReps(restLengthBetweenReps)
                    beginRestBetweenReps()
                } else {
                    setTimeLeftOfRest(restLength)
                    beginRestBetweenSets()
                }
            } else {
                if (currentExerciseIndex === (totalExercises - 1)) {
                    beginNextCycle()
                } else {
                    beginNextExercise()
                }
            }
        }
    }, [timeLeftOfRep])


    const beginNextRep = () => {
        setWorkoutState('reps')
        const myRepInterval = setInterval(() => {
            setTimeLeftOfRep(prev => prev - 1)
        }, 1000)
        setCurrentInterval(myRepInterval);
    }


    ////SETS
    const beginSet = () => {
        clearInterval(currentInterval)
        setTimeLeftOfRep(lengthOfRep)
        if (currentSet <= noOfSets) {
            beginNextRep()
        }
    }

    // resting between reps
    useEffect(() => {
        if (timeLeftOfRestBetweenReps === 0 && workoutState !== 'countdown') {
            setTimeLeftOfRep(lengthOfRep)
            beginNextRep()
            setCurrentRep(prev => prev + 1)
            clearInterval(currentInterval)
            setTimeLeftOfRestBetweenReps(restLengthBetweenReps)
        }
    }, [timeLeftOfRestBetweenReps])

    const beginRestBetweenReps = () => {
        setWorkoutState('rest between reps')
        const myRestBetweenRepsInterval = setInterval(() => {
            setTimeLeftOfRestBetweenReps(prev => prev - 1)
        }, 1000)
        setCurrentInterval(myRestBetweenRepsInterval);
    }

    // resting between sets
    useEffect(() => {
        if (timeLeftOfRest === 0 && workoutState !== 'countdown') {
            clearInterval(currentInterval);
            setCurrentSet(prev => prev + 1)
            setCurrentRep(1)
            beginSet()
        }
    }, [timeLeftOfRest])


    const beginRestBetweenSets = () => {
        setWorkoutState('rest between sets')
        const myRestBetweenSets = setInterval(() => {
            setTimeLeftOfRest(prev => prev - 1)
        }, 1000)
        setCurrentInterval(myRestBetweenSets);
    }


    const pauseWorkout = () => {
        setPaused(true)
        clearInterval(currentInterval)
    }


    const continueWorkout = () => {
        setPaused(false)
        switch (workoutState) {
            case ('countdown'): return beginCountdown();
            case ('reps'): return beginNextRep();
            case ('rest between reps'): return beginRestBetweenReps();
            case ('rest between sets'): return beginRestBetweenSets();
            case ('rest between cycles'): return beginNextCycle();
            case ('rest between exercises'): return beginNextExercise();
            default:
                throw Error({ message: 'crikey' })
        }
    }

    const nextRep = () => {
        setPaused(true)
        setCountdown(10)
        setTimeLeftOfRep(lengthOfRep)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        if (currentRep < noofReps) {
            setCurrentRep(prev => prev + 1)
        }
    }

    const prevRep = () => {
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setPaused(true)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        if (currentRep > 1) {
            setCurrentRep(prev => prev - 1)
        }
    }

    const prevSet = () => {
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setPaused(true)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        if (currentSet > 1) {
            setCurrentRep(1)
            setCurrentSet(prev => prev - 1)
        }
    }

    const nextSet = () => {
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setPaused(true)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        if (currentSet < noOfSets) {
            setCurrentRep(1)
            setCurrentSet(prev => prev + 1)
        }
    }

    const prevExercise = () => {
        setPaused(true)
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        setCurrentRep(1)
        setCurrentSet(1)
        if ((currentExerciseIndex + 1) > 1) {
            setCurrentExerciseIndex(prev => prev - 1)
        }
        if (currentExerciseIndex === 0 && currentCycle > 1) {
            setCurrentExerciseIndex(totalExercises - 1)
            setCurrentCycle(prev => prev - 1)
        }
    }

    const nextExercise = () => {
        setPaused(true)
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        setCurrentRep(1)
        setCurrentSet(1)
        if ((currentExerciseIndex + 1) < totalExercises) {
            setCurrentExerciseIndex(prev => prev + 1)
        }
        if (currentExerciseIndex + 1 === totalExercises && currentCycle < totalCycles) {
            setCurrentExerciseIndex(0)
            setCurrentCycle(prev => prev + 1)
        }
    }

    const prevCycle = () => {
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        setCurrentRep(1)
        setCurrentSet(1)
        setCurrentExerciseIndex(0)
        if (currentCycle > 1) setCurrentCycle(prev => prev - 1)
    }

    const nextCycle = () => {
        setTimeLeftOfRep(lengthOfRep)
        setCountdown(10)
        setWorkoutState('countdown')
        clearInterval(currentInterval)
        setCurrentRep(1)
        setCurrentSet(1)
        setCurrentExerciseIndex(0)
        if (currentCycle < totalCycles) setCurrentCycle(prev => prev + 1)
    }

    return (
        <div className={classes.TimerContainer}>
            <TimerSummary
                CEI={currentExerciseIndex + 1}
                currentCycle={currentCycle}
                totalExercises={totalExercises}
                noOfReps={noofReps}
                noOfSets={noOfSets}
                totalCycles={totalCycles}
                currentRep={currentRep}
                currentSet={currentSet}
                countdown={countdown}
                workoutState={workoutState}
                timeLeftOfRep={timeLeftOfRep}
                timeLeftOfRest={timeLeftOfRest}
                timeLeftOfRestBetweenCycles={timeLeftOfRestBetweenCycles}
                timeLeftOfRestBetweenExercises={timeLeftOfRestBetweenExercises}
                timeLeftOfRestBetweenReps={timeLeftOfRestBetweenReps}
                paused={paused} />



            <TimerControls
                first={currentExerciseIndex === 0 && currentCycle === 1}
                last={currentExerciseIndex * currentCycle === (totalExercises - 1) * totalCycles}
                prevName={
                    props.selectedWorkout.exercises[currentExerciseIndex - 1] ?
                        props.selectedWorkout.exercises[currentExerciseIndex - 1].name :
                        props.selectedWorkout.exercises[props.selectedWorkout.exercises.length - 1].name}
                nextName={
                    currentExerciseIndex + 1 < totalExercises ?
                        props.selectedWorkout.exercises[currentExerciseIndex + 1].name :
                        props.selectedWorkout.exercises[0].name}
                name={SWE.name}
                paused={paused}
                stepForward={() => nextSet()}
                stepBackward={() => prevSet()}
                backward={() => prevRep()}
                forward={() => nextRep()}
                play={() => continueWorkout()}
                pause={() => pauseWorkout()}
                nextExercise={nextExercise}
                prevExercise={prevExercise} />
        </div>

    )
}




export default Timer;