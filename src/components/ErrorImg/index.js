import React from 'react';

import errorPng from '../../assets/img/broken.png'

import './styles.css';

const ErrorImg = (props) => {

    return (
        <div className="errorWrapper">
            <img src={errorPng} alt="" className="errorImg"/>
            <p className="errorText">Um erro ocorreu, por favor tente novamente!</p>
        </div>
    )
}

export default ErrorImg;
