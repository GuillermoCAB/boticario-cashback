import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCog, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../../providers/UserProvider'

import userImg from '../../assets/img/user.png'

import './styles.css';

const Navbar = (props) => {

    const user = useContext(UserContext)

    const logOut = () => {
        user.setLoggedIn(false)
    }

    const redirect = (url) => {
        return props.history.push('/' + url)
    }

    return (
        <div className="navbarWrapper">   
            <img className="userImg" src={userImg} alt=""/>
            <button title="Página Inicial" className="iconContainer selected" onClick={() => redirect('home')}>
                <FontAwesomeIcon className="navIcon" icon={faHome}/>
            </button>         
            <button title="Configurações" className="iconContainer" onClick={() => {}}>
                <FontAwesomeIcon className="navIcon" icon={faCog}/>
            </button>         
            <button title="Sair" className="iconContainer" onClick={logOut}>
                <FontAwesomeIcon className="navIcon" icon={faSignOutAlt}/>
            </button>         
        </div>
    )
};

export default Navbar;
