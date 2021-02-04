import React, { useState, useEffect } from 'react';
import classes from './Input.module.css';



export const NumberInput = props => {


    return (<div className={classes.FlexInput}>
        <label className={classes.Label}>{props.label}</label>
        <input
            min={props.min}
            style={{ width: '50px' }}
            type="number"
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.changed} />
    </div>)
}

export const DualNumberInput = props => {


    return (<div className={classes.DualFlexInput}>
        <label className={classes.Label}>{props.label}</label>
        <input
            min={props.minuteMin}
            style={{ width: '50px', height: '30px' }}
            type="number"
            value={props.minuteVal}
            placeholder={props.minutePlaceholder}
            onChange={props.minuteChanged} /> m
        <input
            min={props.min}
            style={{ width: '50px', height: '30px' }}
            type="number"
            value={props.secondVal}
            placeholder={props.secondPlaceholder}
            onChange={props.secondChanged} /> s
    </div>)
}


export const TextInput = props => {
    return (
        <div className={classes.FlexInput}>
            <label className={classes.Label}>{props.label}</label>
            <input
                type="text"
                value={props.value}
                onChange={props.changed} />
        </div>
    )
}
export const PasswordInput = props => {
    return (
        <div className={classes.FlexInput}>
            <label className={classes.Label}>{props.label}</label>
            <input
                type="password"
                value={props.value}
                onChange={props.changed} />
        </div>
    )
}

export const RadioInput = props => {
    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            <input
                type="radio"
                value={props.value}
                name={props.name}
                placeholder={props.placeholder} />
        </div>
    )
}

