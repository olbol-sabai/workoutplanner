import React, {useState, useEffect} from 'react';
import {TextInput, PasswordInput} from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './Login_Register.module.css';
import {connect} from 'react-redux';
import * as AuthActionCreators from '../../../store/actions/auth';
import * as utilActionCreators from '../../../store/actions/utils';
import * as workoutActionCreators from '../../../store/actions/workouts';


const LoginRegister = ({currentUser, fetchWorkouts, logout, clearWorkouts, setWorkspaceState, login, register, authMessage}) => {

    const [loginStatus, setLoginStatus] = useState(true)
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [password2, setPassword2] = useState(null)

    useEffect(() => {
        logout()
        clearWorkouts()
    }, []);
    
    useEffect(() => {
        if(currentUser.token != null) {
            setWorkspaceState('nothing selected')
            fetchWorkouts(currentUser.token)
        }
    }, [currentUser.token])


    const formHandler = e => {
        e.preventDefault();
        loginStatus ? login(username, password, currentUser.token) : register(username, email, password, password2)
    }
    

    return (
        <div className={classes.LoginContainer}>
            <h2>{loginStatus ? 'Login' : 'Register'} Page</h2>
            <Button extraStyles={classes.ButtonContainer} clicked={() => setLoginStatus(!loginStatus)}>{loginStatus ? 'Switch to Register' : 'Switch to Login'}</Button>
            <form onSubmit={formHandler}>
                <TextInput label="Username" changed={(e) => setUsername(e.target.value)} value={username}/>
                {loginStatus ? null : <TextInput label="Email" changed={(e) => setEmail(e.target.value)} value={email}/>}
                <PasswordInput label="Password" changed={(e) => setPassword(e.target.value)} value={password}/>
                {loginStatus ? null : <PasswordInput label="Confirm Password" changed={(e) => setPassword2(e.target.value)} value={password2}/>}
                <Button extraStyles={classes.ButtonContainer} type="submit">{loginStatus ? 'Login' : 'Register'}</Button>
            </form>
            { authMessage.map((message, idx) => (
                <h6 key={idx}>{message}</h6>
            )) 
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authMessage: state.auth.authMessage,
        currentUser: state.auth.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(AuthActionCreators.logout()),
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)), 
        register: (username, email, password1, password2) => dispatch(AuthActionCreators.asyncRegister(username, email, password1, password2)),
        login: (username, password, token) => dispatch(AuthActionCreators.asyncLogin(username, password, token)),
        clearWorkouts: () => dispatch(workoutActionCreators.clearWorkouts()),
        fetchWorkouts: (token) => dispatch(utilActionCreators.asyncFetchWorkouts(token))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);