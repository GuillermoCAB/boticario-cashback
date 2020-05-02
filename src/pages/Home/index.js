import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDownAlt, faPlus  } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../../providers/UserProvider'
import Navbar from '../../components/Navbar'
import Grid from '../../components/Grid'
import Pagination from '../../components/Pagination'
import NewPurchase from '../NewPurchase'

import logo from '../../assets/img/oBoticarioBlack.svg'

import './styles.css'

const Home = (props) => {
    const user = useContext(UserContext)

    const [orderBy, setOrderBy] = useState('date')
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const [balance, setBalance] = useState()
    const [total, setTotal] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!user.loggedIn) {return props.history.push('/') }
        getBalance()
    }, [user.loggedIn])

    useEffect(() => {
        getData()
    },[page, orderBy])

    const getData = async () => {
        setLoading(true)

        try {

            let params = {
                orderBy,
                page
            }

            let fetch = await axios.post("http://www.mocky.io/v2/5eac7a28330000bf0cdfe453?mocky-delay=1000ms", params) //REGULAR
            // let fetch = await axios.post("http://www.mocky.io/v2/5eac76ff3300003941dfe440", params) //EMPTY

            setItems(fetch.data.items)
            setTotal(fetch.data.total)
            setLoading(false)
            setError(false)

        } catch (e) {
            console.error(e)
            setLoading(false)
            setError(true)
        }
    }

    const getBalance = async () => {
        setLoading(true)

        try {

            let params ={
                id: user.id
            }

            let fetch = await axios.get("http://www.mocky.io/v2/5eac2e463300008524dfe267", params)

            setBalance(fetch.data.balance)
            setLoading(false)

        } catch (e) {
            console.error(e)  
            setLoading(false)          
        }
    }

    const changePage = async (target) => {
        setPage(target)
    }

    const handleOrder = (e) => {
        setOrderBy(e.target.value)
    }

    const handleNew = () => {
        let clip = document.getElementById('clip')

        clip.style.clipPath = 'inset(0% 0% 0% 0%)'

        if (window.matchMedia("(max-width: 35.5em)").matches) {
            setTimeout(() => {resizeWindow()}, 1000)
        }
    }

    const resizeWindow = () => {        
        let wrapper = document.getElementById('homeWrapper')

        wrapper.style.maxHeight = '940px';
    }

    return (
        <div id="homeWrapper" className="homeWrapper">
            <Navbar history={props.history}/>
            <NewPurchase user={user} />
            <div className="homeContainer">

                <img className="mainLogo" src={logo} alt="oBoticario"/>

                <div className="headerRow">
                    <p className="title">Compras cadastradas</p>
                    <button className="clipBtn" onClick={handleNew}>                        
                        <FontAwesomeIcon className="btnIcon" icon={faPlus}/>Cadastrar Compra
                    </button>
                </div>

                <div className="sortRow">
                        <div className="order">
                            <FontAwesomeIcon className="sortIcon" icon={faSortAmountDownAlt}/>
                            Ordenar por
                            <select onChange={handleOrder} name="orderSelect" id="orderSelect" value={orderBy}>
                                <option value="date">Data</option>
                                <option value="purchaseValue">Compra</option>
                                <option value="cbValue">Cashback</option>
                                <option value="cbPercentual">Percentual</option>
                            </select>
                        </div>
                        <p>Saldo Disponível - R${balance}</p>
                </div>

                <Grid error={error} loading={loading} items={items} />
                <Pagination error={error} loading={loading} items={items} page={page} total={total} changePage={changePage} />
            </div>
        </div>
    )
}

export default Home;
