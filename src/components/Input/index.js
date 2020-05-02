import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.css';

const Input = (props) => {
    if(props.icon) {
        return (
            <div className="inputWrapper">
                <input minLength={props.minLength || null} value={props.value} onChange={props.setValue} type={props.type} className="regularInput" placeholder={props.label} id={props.label} title="Preencha esse campo." required />
                <label htmlFor={props.label} className="inputLabel">{props.label}</label>
                <FontAwesomeIcon className="inputIcon" icon={props.icon} onClick={() => props.iconClick(props.label)}/>
            </div>
        )
    } else {
        return (
            <div className="inputWrapper">
                <input minLength={props.minLength || null} value={props.value} onChange={props.setValue} type={props.type} className="regularInput" placeholder={props.label} id={props.label} title="Preencha esse campo." required />
                <label htmlFor={props.label} className="inputLabel">{props.label}</label>
            </div>
        )
    }
}

export default Input;
