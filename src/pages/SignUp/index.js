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

const SignUp = (props) => {

    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [btnContent, setBtnContent] = useState('CADASTRAR')

    const user = useContext(UserContext)

    const eye = () => {
        return visible ? faEye : faEyeSlash
    }

    const handleVisibility = (target) => {
        let input = document.getElementById(target)

        input.type === 'password' ? input.type = 'text' :  input.type = 'password'

        setVisible(!visible)
    }

    const signIn = async () => {
        if (btnContent === 'CADASTRAR') {
            try {
                
                let params = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    cpf: user.cpf,
                    email: user.email,
                    password: password
                }

                let fetch = await axios.post("http://www.mocky.io/v2/5ea9e98c2d000089002683f2", params)
                // let fetch = await axios.post("http://www.mocky.io/v2/5ea9ea7f2d00004d002683f8", params) //ERROR 400

                if (fetch.data) {
                    user.setLoggedIn(true)
                    user.setToken(fetch.data.token)
                    user.setId(fetch.data.id)
                }
                setBtnContent('CADASTRAR')

                return props.history.push('/home')
            } catch (e) {
                console.error(e)
                setBtnContent('CADASTRAR')
                return e.response.status === 400 ? warnUser('CPF já cadastrado.') : warnUser('Ocorreu um erro, tente novamente.')               
            }
        }
    }

    const validate = () => {
        let emailInput = document.getElementById('Email')
        let passwordInput = document.getElementById('Senha')

        resetWarnUser()
        setBtnContent(<img className="loaderIcon" src={loader}/>)

        if (!user.firstName) {

            setBtnContent('CADASTRAR')
            return warnUser('Insira um nome.')

        }

        if (!user.lastName) {

            setBtnContent('CADASTRAR')
            return warnUser('Insira um sobrenome.')

        }

        if (!validateCpf(user.cpf)) {

            return setBtnContent('CADASTRAR')                   

        }

        if (!emailInput.checkValidity()) {

            setBtnContent('CADASTRAR')
            return warnUser('Insira um email válido.')

        }

        if (!passwordInput.checkValidity()) {

            setBtnContent('CADASTRAR')
            return warnUser('Insira uma senha com 8 caracteres.')

        }

        return signIn()
    }

    const validateCpf = (cpf) => {
        let resto = 0
        let soma = 0
    
        cpf = remove(cpf, '.');
        cpf = remove(cpf, '-');
    
        if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        ) {
            warnUser('CPF inválido. Por favor corrija');
            return false;
        }
    
        soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
    
        resto = 11 - soma % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.charAt(9))) {
            warnUser('CPF inválido. Por favor corrija');
            return false;
        }
    
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - soma % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
    
        if (resto !== parseInt(cpf.charAt(10))) {
            warnUser('CPF inválido. Por favor corrija');
            return false;
        }
    
        return true;
    }

    const remove = (str, sub) => {
        let index = str.indexOf(sub);
        let result = '';

        if (index === -1) return str;
        {
            result += str.substring(0, index) + remove(str.substring(index + sub.length), sub);
        }
    
        return result;
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

    const { firstName, lastName, cpf, email, handleFirstName, handleLastName, handleCpf, handleEmail } = user
    
    return (
        <div className="signWrapper"> 
            <div className="box">
                <img src={logo} alt=""/>
                <p>Cashback - Venda Mais, Ganhe Mais</p>
                <span id="warnUser"></span>
                <Input value={firstName} setValue={handleFirstName} label="Nome" type="text"/>
                <Input value={lastName} setValue={handleLastName} label="Sobrenome" type="text"/>
                <Input minLength="13" value={cpf} setValue={handleCpf} label="CPF" type="text"/>
                <Input value={email} setValue={handleEmail} label="Email" type="email"/>
                <Input minLength="8" value={password} setValue={handlePassword}  iconClick={handleVisibility} icon={eye()} label="Senha" type="password"/>
                <Button content={btnContent} onClick={validate}/>
                <span>Ou cadastre com</span>
                <div className="socialSign">
                    <FaceButton />
                    <GoogleButton />
                </div>
                <p className="signFooter">Já está cadastrado? <a href="/">Entre agora!</a></p>
            </div>
        </div>
    )
}

export default SignUp;