import React, { useEffect, useState } from 'react';
import { faPause, faPlay, faStepBackward, faStepForward, faBackward, faForward, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classes from './TimerControls.module.css';
import Icon from '../../../../components/UI/FontAwesomeIcon/FontAwesomeIcon';




const TimerControls = props => {


    let playPauseControl = props.paused ?
        <Icon icon={faPlay} clicked={props.play} size="3x" /> :
        <Icon icon={faPause} clicked={props.pause} size="3x" />


    const stepForwardIcon = <Icon icon={faStepForward} clicked={props.stepForward} size="2x" />
    const stepBackwardIcon = <Icon icon={faStepBackward} clicked={props.stepBackward} size="2x" />
    const backwardIcon = <Icon icon={faBackward} clicked={props.backward} size="2x" />
    const forwardIcon = <Icon icon={faForward} clicked={props.forward} size="2x" />


    return (
        <div className={classes.Controls}>
            <div className={classes.SecondaryControls}>
                <Icon icon={faChevronLeft} size="3x" clicked={() => props.prevExercise()} />
                <div className={classes.Toggle}>
                    <h4 className={classes.Prev}>
                        {!props.first ? props.prevName : null}
                    </h4>
                    <h1 className={classes.ExerciseName}>
                        {props.name}
                    </h1>
                    <h4 className={classes.Next}>
                        {!props.last ? props.nextName : null}
                    </h4>
                </div>
                <Icon icon={faChevronRight} size="3x" clicked={() => props.nextExercise()} />
            </div>
            <div className={classes.MainControls}>
                <div className={classes.Buttons}>
                    {stepBackwardIcon}
                    <p className={classes.IconDesc}>Set</p>
                </div>
                <div className={classes.Buttons}>
                    {backwardIcon}
                    <p className={classes.IconDesc}>Rep</p>
                </div>
                {playPauseControl}
                <div className={classes.Buttons}>
                    {forwardIcon}
                    <p className={classes.IconDesc}>Rep</p>
                </div>
                <div className={classes.Buttons}>
                    {stepForwardIcon}
                    <p className={classes.IconDesc}>Set</p>
                </div>
            </div>
        </div>
    )
}

export default TimerControls;