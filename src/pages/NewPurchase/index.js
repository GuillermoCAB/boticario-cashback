import React, { useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faList  } from '@fortawesome/free-solid-svg-icons'

import Input from '../../components/InputWhite'

import logo from '../../assets/img/oBoticarioWhite.svg'
import loader from '../../assets/img/loader.svg'

import './styles.css';

const NewPurchase = (props) => {

    const [date, setDate] = useState('')
    const [code, setCode] = useState('')
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState('')

    const handleCode = (e) => {
        setCode(e.target.value)
    }

    const handleDate = (e) => {
        setDate(formatDate(e.target.value))
    }

    const handleValue = (e) => {
        setValue(formatValue(e.target.value))
    }

    const formatDate = (data) => { 
        data = data
        .replace(/\D/g,"")
        .replace(/(\d{2})(\d)/,"$1/$2")
        .replace(/(\d{2})(\d)/,"$1/$2")
        .replace(/(\d{4})\d+?$/, '$1')
        
        return data; 
    }

    const formatValue = (value) => { 
        value = value
        .replace(/\D/g,"")
        .replace(/(\d{1})(\d{1,2})$/,"$1,$2") 
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")

        return value
    }

    const handleList = () => {
        let clip = document.getElementById('clip')
        let wrapper = document.getElementById('homeWrapper')

        clip.style.clipPath = 'inset(0% 0% 100% 100%)'

        wrapper.style.maxHeight = '';
    }

    const purchaseWarnUser = (text) => {
        let target = document.getElementById('purchaseWarnUser')
        let targetText = document.getElementById('warnUserText')
        let targetBtn = document.getElementById('warnBtn')

        targetText.innerHTML = text
        target.style.backgroundColor = 'rgba(136, 81, 81, 0.395)'
        targetBtn.style.display = 'inline-block'
    }

    const notifyUser = (text) => {
        let target = document.getElementById('purchaseWarnUser')
        let targetText = document.getElementById('warnUserText')
        let targetBtn = document.getElementById('warnBtn')

        targetText.innerHTML = text
        target.style.color = '#fff'
        targetBtn.style.color = '#fff'
        target.style.backgroundColor = '#529473'
        targetBtn.style.display = 'inline-block'
    }

    const resetWarnUser = () => {
        let target = document.getElementById('purchaseWarnUser')
        let targetText = document.getElementById('warnUserText')
        let targetBtn = document.getElementById('warnBtn')

        targetText.innerHTML = ''
        target.style.color = 'rgb(153, 36, 36)'
        targetBtn.style.color = 'rgb(153, 36, 36)'
        target.style.backgroundColor = 'transparent'
        targetBtn.style.display = 'none'
    }

    const validate = () => {

        resetWarnUser()

        let dateInput = document.getElementById('Data')
        let valueInput = document.getElementById('Valor')

        if (!code) {
            return purchaseWarnUser("Por favor insira o código da compra!")
        }

        if (!dateInput.checkValidity()) {
            return purchaseWarnUser("Por favor insira uma data válida!")
        }
        
        if (!valueInput.checkValidity()) {
            return purchaseWarnUser("Por favor insira valor da compra!")
        }

        registryPurchase()
    }

    const registryPurchase = async () => {
        setLoading(true)

        try {

            let params = {
                date,
                code,
                value,
                userId: props.user.id

            }

            await axios.post("http://www.mocky.io/v2/5eac9e4c3300003941dfe649?mocky-delay=1000ms", params)

            setLoading(false)
            setDate('')
            setCode('')
            setValue('')
            notifyUser("Compra cadastrada com sucesso.")

        } catch (e) {
            setLoading(false)  
            purchaseWarnUser("Ocorreu um problema por favor tente novamente.")      
        }
    }

    if (loading) {

        return (
            <div id="clip" className="clip">
                <img className="purchaseLogo" src={logo} alt="oBoticario"/>
    
                <div className="headerRow">
                    <p className="title">Cadastrar Compra</p>
                    <button className="clipBtn" onClick={handleList}>                 
                        <FontAwesomeIcon className="btnIcon" icon={faList}/> Listagem
                    </button>
                </div>
    
                <div className="box">
                    <img className="boxLoader" src={loader} alt=""/>
                </div>
    
            </div>
        )
    } else {

        return (
            <div id="clip" className="clip">
                <img className="purchaseLogo" src={logo} alt="oBoticario"/>
    
                <div className="headerRow">
                    <p className="title">Cadastrar Compra</p>
                    <button className="clipBtn" onClick={handleList}>                 
                        <FontAwesomeIcon className="btnIcon" icon={faList}/> Listagem
                    </button>
                </div>
    
                <div className="box">
                    <p>Preencha com os dados da compra</p>
                    <div id="purchaseWarnUser">
                        <p id="warnUserText">
                        </p>
                        <button id="warnBtn" onClick={resetWarnUser}>X</button>
                    </div>
                    <Input label="Código da Compra" type="text" value={code} setValue={handleCode} />
                    <Input label="Data" type="text" value={date} setValue={handleDate} minLength={10} />
                    <Input label="Valor" type="text" value={value} setValue={handleValue} />
                    <button className="boxBtn" onClick={validate}>                 
                        <FontAwesomeIcon className="btnIcon" icon={faMoneyBillWave}/> Cadastrar
                    </button>
                </div>
    
            </div>
        )
    }
};

export default NewPurchase;
