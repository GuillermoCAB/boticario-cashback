import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './styles.css';

const InputWhite = (props) => {
    if(props.icon) {
        return (
            <div className="inputWhiteWrapper">
                <input minLength={props.minLength || null} value={props.value} onChange={props.setValue} type={props.type} className="regularInputWhite" placeholder={props.label} id={props.label} title="Preencha esse campo." required />
                <label htmlFor={props.label} className="inputWhiteLabel">{props.label}</label>
                <FontAwesomeIcon className="inputWhiteIcon" icon={props.icon} onClick={() => props.iconClick(props.label)}/>
            </div>
        )
    } else {
        return (
            <div className="inputWhiteWrapper">
                <input minLength={props.minLength || null} value={props.value} onChange={props.setValue} type={props.type} className="regularInputWhite" placeholder={props.label} id={props.label} title="Preencha esse campo." required />
                <label htmlFor={props.label} className="inputWhiteLabel">{props.label}</label>
            </div>
        )
    }
}

export default InputWhite;
