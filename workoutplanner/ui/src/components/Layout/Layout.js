import React, {useState} from 'react';
import classes from './Layout.module.css';
import WorkoutList from '../../containers/WorkoutList/WorkoutList';
import WorkSpace from '../../containers/WorkSpace/Workspace';


const Layout = props => {

    return (
        <div className={classes.Layout}>
            <WorkoutList/>
            <WorkSpace/>
            {props.children}
        </div>
    );
}

export default Layout;
