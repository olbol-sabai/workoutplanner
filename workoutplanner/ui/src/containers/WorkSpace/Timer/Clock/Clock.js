import React from 'react';
import classes from './Clock.module.css';


const Clock = props => {

    let message = props.restState === 'countdown' ? 'Get Ready' :
    props.restState === 'work' ? 'Go!' : 'Rest'
    let secs
    let mins
    if(props.clockcount > 59) {
        secs = props.clockcount % 60
        if(secs < 10) secs = `0${secs}`
        mins = Math.floor(props.clockcount / 60)
    }
    return (
        <div className={classes.ClockContainer}>
            <p className={classes.Message}>{message}</p>
            {props.clockcount > 59 ?
            <p className={classes.ClockCount}>{mins}:{secs}</p> :
            <p className={classes.ClockCount}>{props.clockcount}</p> }
        </div>
    )
}


export default Clock;