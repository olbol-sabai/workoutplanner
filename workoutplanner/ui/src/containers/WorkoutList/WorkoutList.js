import React, { useEffect } from 'react';
import classes from './WorkoutList.module.css';
import { connect } from 'react-redux';
import * as utilActionCreators from '../../store/actions/utils';
import * as AuthActionCreators from '../../store/actions/auth';
import { faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import WorkoutListItem from '../WorkoutList/WorkoutListItems/WorkoutListItems';
import Button from '../../components/UI/Button/Button';
import Icon from '../../components/UI/FontAwesomeIcon/FontAwesomeIcon';

const WorkoutList = props => {

    useEffect(() => {
        if (props.workouts.length === 0) props.setWorkspaceState('login/register')
    }, [])

    const createWorkout = () => {
        props.setWorkspaceState('creatingWorkout')
    }

    const logoutHandler = () => {
        props.setWorkspaceState('login/register')
        props.logout()
    }


    let workoutList = (
        <ul className={classes.WorkoutListUL}>
            {props.workouts.map(workout => {
                return <WorkoutListItem
                    key={workout.id}
                    id={workout.id}
                    cycles={workout.cycles}
                    workoutName={workout.name}
                    workout={workout}
                    exerciseCount={workout.exercises.length}
                    duration={"30"} />
            })}
        </ul>
    )

    return (
        <div className={classes.WorkoutList}>
            <h1 className={classes.Title}>Workout List</h1>
            {workoutList}
            {props.currentUser.token ?
                <div className={classes.FlexButtons}>
                    <Button
                        extraStyles={classes.Button}
                        clicked={createWorkout}>
                        <Icon icon={faPlus} />
                    </Button>
                    <Button
                        extraStyles={classes.Button}
                        clicked={logoutHandler}>
                        <Icon icon={faSignOutAlt} />

                    </Button>

                </div>
                : null}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
        workspaceState: state.util.workspaceState,
        workouts: state.workout.workouts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),
        logout: () => dispatch(AuthActionCreators.logout()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutList);


