import React from 'react';
import classes from './ExcerciseListItems.module.css';
import { connect } from 'react-redux';
import * as utilActionCreators from '../../../../store/actions/utils';


const ExcerciseListItems = props => {

    return (
        <li className={classes.ListItem}>
            <div className={classes.Name}>
                <h4>{props.name}</h4>
            </div>
            <div className={classes.Sets}>
                <h5>
                    Sets x {props.noOfSets}
                </h5>
            </div>
            <div className={classes.Reps}>
                <h5>
                    Reps x {props.noOfReps}
                </h5>
            </div>
        </li>
    )
}

// }
const mapDispatchToProps = dispatch => {
    return {
        setWorkspaceState: (state) => dispatch(utilActionCreators.setWorkspaceState(state)),
        setSaveRequired: (bool) => dispatch(utilActionCreators.saveRequired(bool)),
    }
}

export default connect(null, mapDispatchToProps)(ExcerciseListItems);