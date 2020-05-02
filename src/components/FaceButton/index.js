import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

import './styles.css';

const FaceButton = (props) => 
    <button className="faceBtn" onClick={props.btnClick}>
        <FontAwesomeIcon className="icon" icon={faFacebookF}/>
        Facebook
    </button>

export default FaceButton;
