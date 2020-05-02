import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import './styles.css';

const GoogleButton = (props) => 
    <button className="gooBtn" onClick={props.btnClick}>
        <FontAwesomeIcon className="icon" icon={faGoogle}/>
        Google
    </button>

export default GoogleButton;
