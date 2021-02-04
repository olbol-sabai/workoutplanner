import React, {useContext} from 'react';
import classes from './Workspace.module.css';
import CreateExcerciseForm from './CreateExcerciseForm/CreateExcerciseForm';
import CreateWorkoutForm from './CreateWorkoutForm/CreateWorkoutForm';
import Timer from './Timer/Timer';
import SelectedWorkout from './SelectedWorkout/SelectedWorkout'
import {connect} from 'react-redux';
import * as utilActionCreators from '../../store/actions/utils';
import LoginRegisterPage from './Auth/Login-Register';
import Logout from './Auth/Logout';

const Workspace = props => {

    let content;
    switch (props.workspaceState) {
        case ('nothing selected'): content = <h3>Please select a workout</h3>
            break
        case ('login/register'): content = <LoginRegisterPage />
            break
        case ('logout'): content = <Logout />
            break
        case ('creatingWorkout'): {
            content = <CreateWorkoutForm />
            break
        }
        case ('creatingExcercise'): case('editingExercise'): {
            content = <CreateExcerciseForm/>
            break
        }
        case ('exercising'): {
            content = <Timer selectedWorkout={props.selectedWorkout}/>
            break
        }
        case ('selectedWorkout'): {
            content = <SelectedWorkout />
            break
        }
        default: throw new Error('no case found')
    }

    return <div className={classes.Workspace}>
                {content}
            </div>
}


const mapStateToProps = state => {
    return {
        workspaceState: state.util.workspaceState,
        selectedWorkout: state.util.selectedWorkout,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
