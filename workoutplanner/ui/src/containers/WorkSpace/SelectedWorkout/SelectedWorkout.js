import React, {useState, useRef, useEffect} from 'react';
import classes from './SelectedWorkout.module.css';
import {connect} from 'react-redux';
import ExcerciseListItems from './ExcerciseListItems/ExcerciseListItems';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import * as utilActionCreators from '../../../store/actions/utils';
import Button from '../../../components/UI/Button/Button';
import axios from 'axios';
import EditWorkoutForm from './EditWorkoutForm/EditWorkoutForm';
import Icon from '../../../components/UI/FontAwesomeIcon/FontAwesomeIcon';
import {faTrash, faCheck, faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const SelectedWorkout = props => {

    const [deletedConfirmed, setDeletedConfirmed] = useState(false)
    const [dragging, setDragging] = useState(false)
    const bottomOfPage = useRef(null);

    useEffect(() => {
        if(props.saveRequired) bottomOfPage.current.scrollIntoView()
    }, [props.saveRequired])

    const changeState = (state) => {
        props.setWorkspaceState(state)
    }
    
    const dragEndHandler = e => {
        setDragging(false)
        if(!props.saveRequired && e.source.index !== e.destination.index) props.setSaveRequired(true);
        props.switchExercises(e.source.index, e.destination.index)
    }

    const saveChanges = () => {
        const headers = {
            Authorization: `JWT ${props.currentUser.token}`
        }
        axios.patch(`http://127.0.0.1:8000/api/workouts/${props.selectedWorkout.id}/`, props.selectedWorkout, {headers: headers})
        .then(res => {
            props.fetchWorkouts(props.currentUser.token) 
            props.setSaveRequired(false)
        })
        .catch(err => console.log(err))
    }
    
    const confirmDeleteWorkout = () => {
        const headers = {
            Authorization: `JWT ${props.currentUser.token}`
        }
        axios.delete(`http://127.0.0.1:8000/api/workouts/${props.selectedWorkout.id}`, {headers: headers})
        .then(res => {
            props.fetchWorkouts(props.currentUser.token) 
            props.setSaveRequired(false)
            props.setWorkspaceState('nothing selected')
        })
        .catch(err => console.log(err))
    }

    const discardChanges = () => {
        props.fetchWorkouts(props.currentUser.token)
        let unchangedWorkout = props.workouts.filter(wo => wo.id === props.selectedWorkout.id)
        props.selectWorkoutHandler(...unchangedWorkout)
        props.setSaveRequired(false)
    }
    
    const editExercise = (id, name, noOfSets, noOfReps, lengthOfRep, restBetweenReps, restBetweenSets) => {
        props.setSelectedExercise(
            id, name, noOfSets, noOfReps, lengthOfRep, restBetweenReps, restBetweenSets
            )
            props.setWorkspaceState('editingExercise');
        }
        
        const deleteExercise = (id) => {
        props.deleteExercise(id)
        props.setSaveRequired(true)
    }

    return (
            <div className={classes.SelectedWorkout}>
                <div className={classes.DraggableList}>
                    <div className={classes.WorkoutTitle}>
                        <h2 className={classes.WorkoutH1}>{props.selectedWorkout.name}</h2>
                        {!deletedConfirmed ? 
                        <Icon 
                            classes={classes.WorkoutIcon}
                            clicked={() => setDeletedConfirmed(true)} 
                            icon={faTrash}
                            size="2x"></Icon> : 
                        <div className={classes.WorkoutIcon}>
                            <p className={classes.Confirm}>Confirm</p>
                            <Icon 
                                clicked={confirmDeleteWorkout} 
                                icon={faCheck}
                                size="1x"></Icon> 
                            <Icon 
                                classes={classes.WorkoutIcon}
                                clicked={() => setDeletedConfirmed(false)} 
                                icon={faTimes}
                                size="1x"></Icon> 
                        </div>
                        }
                    </div>
                    <DragDropContext onDragEnd={dragEndHandler} onDragStart={() => setDragging(true)}>
                        <Droppable droppableId="workoutList">
                            {(provided) => (
                                <ul className={classes.UL} 
                                    ref={provided.innerRef}
                                    key="exerciseList"
                                    {...provided.droppableProps} >
                                    {props.selectedWorkout.exercises.map((exercise, index) => {
                                        return (
                                            <div key={exercise.id} >
                                                <Draggable 
                                                    key={exercise.id} 
                                                    draggableId={exercise.id}
                                                    index={index}>
                                                    {provided => {
                                                        return (
                                                            <div key={exercise.id}                                              
                                                            className={classes.Draggable}
                                                            {...provided.dragHandleProps}
                                                            {...provided.draggableProps}
                                                            ref={provided.innerRef}>
                                                                <ExcerciseListItems 
                                                                    id={exercise.id}
                                                                    name={exercise.name}
                                                                    noOfSets={exercise.noOfSets}
                                                                    noOfReps={exercise.noOfReps}
                                                                    lengthOfRep={exercise.lengthOfRep}
                                                                    restBetweenReps={exercise.restBetweenReps}
                                                                    restBetweenSets={exercise.restBetweenSets} />
                                                                <div>
                                                                    <Button 
                                                                        clicked={() => editExercise(exercise.id, exercise.name, exercise.noOfSets, exercise.noOfReps, exercise.lengthOfRep, exercise.restBetweenReps, exercise.restBetweenSets)}
                                                                        extraStyles={classes.Button}>
                                                                        <FontAwesomeIcon icon={faEdit} />
                                                                        <button className={classes.ButtonAbs}></button>
                                                                    </Button>
                                                                    <Button
                                                                        clicked={() => deleteExercise(exercise.id)}
                                                                        extraStyles={classes.Button}>
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                        <button className={classes.ButtonAbs}></button>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    }
                                                </Draggable>
                                            </div>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
                <div className={classes.EditWorkoutForm}>
                    <EditWorkoutForm 
                        workout={props.selectedWorkout}
                        setSaveRequired={props.setSaveRequired}
                        updateWorkout={props.updateWorkout}/>
                </div>
                <div className={classes.SelectedControls}>
                    {!props.saveRequired ? <Button clicked={() => changeState('creatingExcercise')}>Add Exercise</Button> :
                    <Button clicked={() => discardChanges()}>Discard Changes</Button>    }
                    {props.selectedWorkout.exercises.length === 0 ? null : !props.saveRequired ?
                     <Button clicked={() => changeState('exercising')}>Begin Workout</Button> : null }
                    {props.saveRequired ? 
                    <Button 
                        disabled={props.selectedWorkout.cycles < 1 || props.selectedWorkout.restBetweenExercises < 1 || props.selectedWorkout.restBetweenCycles < 1}
                        style={{color: 'red'}} 
                        clicked={() => saveChanges()}>Save Changes</Button> : null}
                </div>
                <div ref={bottomOfPage}></div>
            </div>
        )
}





const mapStateToProps = state => {
    return {
        workouts: state.workout.workouts,
        selectedWorkout: state.util.selectedWorkout,
        saveRequired: state.util.saveRequired,
        currentUser: state.auth.currentUser,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        switchExercises: (id1, id2) => dispatch(utilActionCreators.switchExercises(id1, id2)),
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),
        setSaveRequired: (bool) => dispatch(utilActionCreators.saveRequired(bool)),
        fetchWorkouts: (token) => dispatch(utilActionCreators.asyncFetchWorkouts(token)),
        selectWorkoutHandler: (workout) => dispatch(utilActionCreators.selectWorkoutHandler(workout)), 
        updateWorkout: (cycles, restBetweenExercises, restBetweenCycles) => dispatch(utilActionCreators.updateWorkout(cycles, restBetweenExercises, restBetweenCycles)),
        setSelectedExercise: (id, name, noOfSets, noOfReps, lengthOfRep, restBetweenReps, restBetweenSets) => dispatch(utilActionCreators.selectExerciseHandler(id, name, noOfSets, noOfReps, lengthOfRep, restBetweenReps, restBetweenSets)),
        deleteExercise: (id) => dispatch(utilActionCreators.deleteExercise(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWorkout);

