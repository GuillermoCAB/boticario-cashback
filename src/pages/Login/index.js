import React, { useState, useContext } from 'react'
import axios from 'axios'

import './styles.css'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/img/oBoticario.svg'
import loader from '../../assets/img/loader.svg'

import { UserContext } from '../../providers/UserProvider'

import Input from '../../components/Input'
import Button from '../../components/Button'
import FaceButton from '../../components/FaceButton'
import GoogleButton from '../../components/GoogleButton'

const Login = (props) => {

    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [btnContent, setBtnContent] = useState('ENTRAR')

    const user = useContext(UserContext)

    const eye = () => {
        return visible ? faEye : faEyeSlash
    }

    const handleVisibility = (target) => {
        let input = document.getElementById(target)

        input.type === 'password' ? input.type = 'text' :  input.type = 'password'

        setVisible(!visible)
    }

    const logIn = async () => {
        try {
            
            let params = {
                email: user.email,
                password: user.password
            }

            let fetch = await axios.post("http://www.mocky.io/v2/5ea9b43234000083113f076e", params)
            // let fetch = await axios.post("http://www.mocky.io/v2/5ea9b6ec340000672c3f0791", params) //ERROR 401

            if (fetch.data) {
                user.setLoggedIn(true)
                user.setToken(fetch.data.token)
                user.setId(fetch.data.id)
                user.setFirstName(fetch.data.firstName)
                user.setLastName(fetch.data.lastName)
            }
            setBtnContent('ENTRAR')

            return props.history.push('/home')
        } catch (e) {
            console.error(e)
            setBtnContent('ENTRAR')
            return e.response.status === 401 ? warnUser('Email ou senha inválidos.') : warnUser('Ocorreu um erro, tente novamente.')               
        }
    }

    const validate = () => {
        let emailInput = document.getElementById('Email')

        resetWarnUser()
        setBtnContent(<img className="loaderIcon" src={loader}/>)

        if (!emailInput.checkValidity()) {

            setBtnContent('ENTRAR')
            return warnUser('Insira um email válido.')

        }

        if (!password) {

            setBtnContent('ENTRAR')
            return warnUser('Insira uma senha.')

        }

        return logIn()
    }

    const warnUser = (text) => {
        let target = document.getElementById('warnUser')

        target.innerHTML = text
        target.style.backgroundColor = 'rgba(136, 81, 81, 0.395)'
    }

    const resetWarnUser = () => {
        let target = document.getElementById('warnUser')

        target.innerHTML = ''
        target.style.backgroundColor = 'transparent'
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    return (
        <div className="loginWrapper"> 
            <div className="box">
                <img src={logo} alt=""/>
                <p>Cashback - Venda Mais, Ganhe Mais</p>
                <span id="warnUser"></span>
                <Input value={user.email} setValue={user.handleEmail} label="Email" type="email"/>
                <Input value={password} setValue={handlePassword}  iconClick={handleVisibility} icon={eye()} label="Senha" type="password"/>
                <a href="/#">Esqueceu sua senha?</a>
                <Button content={btnContent} onClick={validate}/>
                <span>Ou entre com</span>
                <div className="socialLogin">
                    <FaceButton />
                    <GoogleButton />
                </div>
                <p className="loginFooter">Não está cadastrado? <a href="/cadastrar">Cadastre-se agora!</a></p>
            </div>
        </div>
    )
}

export default Login;