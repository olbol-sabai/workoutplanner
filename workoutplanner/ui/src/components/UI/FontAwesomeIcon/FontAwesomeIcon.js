import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './FontAwesomeIcon.module.css';

const Icon = props => {

    let classesNames = props.classes 
    ? [classes.Button, props.classes].join(' ') 
    : classes.Button

    return(
        <button 
            onClick={props.clicked}
            className={classesNames}>
            {props.children}
            <FontAwesomeIcon
                            icon={props.icon} 
                            size={props.size}
                            style={props.style}/>
        </button>
    )
}

export default Icon;