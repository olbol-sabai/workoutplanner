import React, {useState, useEffect} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Login_Register.module.css';
import {connect} from 'react-redux';
import * as AuthActionCreators from '../../../store/actions/auth';
import * as utilActionCreators from '../../../store/actions/utils';
import * as workoutActionCreators from '../../../store/actions/workouts';



const Logout = props => {

    useEffect(() => {
        if(props.currentUser.token == null) props.setWorkspaceState('login/register')
    })

    const logout = () => {
        props.logout()
        props.clearWorkouts()
        props.setWorkspaceState('login/register')
    }

    return (
        <div className={classes.LogoutContainer}>
            <h3>Thanks {props.currentUser.username} - Click here to logout</h3>
            <Button clicked={logout}>Logout</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)), 
        logout: () => dispatch(AuthActionCreators.logout()),
        clearWorkouts: () => dispatch(workoutActionCreators.clearWorkouts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);