import React from 'react'
import classes from './Button.module.css'


const button = React.memo(props => {

    let buttonClasses = [classes.Button]
    if(props.extraStyles) buttonClasses = [classes.Button, props.extraStyles].join(' ');

    return (

        <button 
            style={props.style}
            ref={props.ref}
            onClick={props.clicked}
            type={props.type}
            disabled={props.disabled}
            className={[buttonClasses]}>
            {props.children}
        </button>
    )
})

export default button;