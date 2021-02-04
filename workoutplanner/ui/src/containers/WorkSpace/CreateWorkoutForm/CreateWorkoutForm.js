import React, {useState, useEffect} from 'react';
import {NumberInput, TextInput} from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './CreateWorkoutForm.module.css';
import {connect} from 'react-redux';
import uuid from 'react-uuid';
import * as workoutActionCreators from '../../../store/actions/workouts';
import * as utilActionCreators from '../../../store/actions/utils';
import axios from 'axios';



const CreateWorkoutForm = props => {

    const [newWorkoutID, setNewWorkoutID] = useState(null)
    const [workoutName, setWorkoutName] = useState('');
    const [valid, setValid] = useState(false)

    useEffect(() => {
        workoutName !== '' ? setValid(true) : setValid(false);
    }, [workoutName])

    useEffect(() => {    
        if(newWorkoutID !== null) {
            props.setSaveRequired(false)
            let workout = props.workouts.filter(wo => wo.id === newWorkoutID)
            props.selectWorkoutHandler(...workout)
            props.setWorkspaceState('selectedWorkout')
        }        
    }, [props.workouts])
    
    const createWorkout = () => {
        const data = {
            name: workoutName,
            cycles: 1,
            restBetweenExercises: 30,
            restBetweenCycles: 30,
            exercises: null,
        }
        const headers = {
            Authorization: `JWT ${props.currentUser.token}`
        }
        axios.post(`http://127.0.0.1:8000/api/workouts/`, data, {headers: headers})
        .then(res => {
            setNewWorkoutID(res.data.id)
            props.fetchWorkouts(props.currentUser.token)             
        })
        .catch(err => console.log(err))
    }

    const cancel = () => {
        props.setWorkspaceState('nothing selected')
    }

    return (
            <div className={classes.Workout}>
                <h3>Create a New Workout</h3>
                <TextInput 
                    label="Workout Name" 
                    changed={(e) => setWorkoutName(e.target.value)}/>
                <Button disabled={!valid} clicked={createWorkout}>Create New Workout</Button>
                <Button clicked={cancel}>Cancel</Button>
            </div>)
}


const mapStateToProps = state => {
    return {
        workspaceState: state.util.workspaceState,
        currentUser: state.auth.currentUser,
        workouts: state.workout.workouts,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createWorkoutHandler: (name, cycles, id) => dispatch(workoutActionCreators.createWorkout(name, cycles, id)),
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),  
        setSaveRequired: (bool) => dispatch(utilActionCreators.saveRequired(bool)),
        fetchWorkouts: (token) => dispatch(utilActionCreators.asyncFetchWorkouts(token)),
        selectWorkoutHandler: (workout) => dispatch(utilActionCreators.selectWorkoutHandler(workout)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkoutForm);