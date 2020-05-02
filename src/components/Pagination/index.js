import React, { useEffect, useState } from 'react';

import loader from '../../assets/img/searchLoader.svg'

import './styles.css';

const Pagination = (props) => {

    const [lastPage, setLastPage] = useState(0)
    const [maxItems, setMaxItems] = useState(0)

    useEffect(() => {        
        setPages()
    }, [props])

    const setPages = () => {
        let total = Math.ceil(props.total/12)

        setLastPage(total)

        let max = props.page * 12

        max <= props.total ? setMaxItems(max) : setMaxItems(props.total)

        if (!props.loading && !props.error && props.items.length) hideBtns()
    }

    const hideBtns = () => {
        let back2 = document.getElementById('back2') 
        let back1 = document.getElementById('back1')
        let next2 = document.getElementById('next2')  
        let next1 = document.getElementById('next1')  

        let limit = Math.ceil(props.total/12) - props.page

        switch (props.page) {
            case 1:     
            back2.style.display = 'none'
            back1.style.display = 'none'               
                break;

            case 2:     
            back2.style.display = 'none'
            back1.style.display = 'inline-block'               
                break;
        
            default:     
            back2.style.display = 'inline-block'
            back1.style.display = 'inline-block'
                break;
        }

        switch (limit) {
            case 1:     
            next2.style.display = 'none'
            next1.style.display = 'inline-block'                
                break;

            case 0:     
            next2.style.display = 'none'
            next1.style.display = 'none'                
                break;
        
            default:     
            next2.style.display = 'inline-block'
            next1.style.display = 'inline-block'
                break;
        }
    }

    if (props.loading || props.error || !props.items.length) {
        return <div />
    } else {
        return (
            <div className="paginationWrapper">
                <div className="info">
                    <p>Mostrando {(props.page * 12) - 11} a {maxItems} de {props.total}</p>
                </div>
                <div className="pages">
                    <button onClick={() => props.changePage(1)}>&lt;&lt;</button>
                    <button id="back2" onClick={() => props.changePage(props.page - 2)}>{props.page - 2}</button>
                    <button id="back1" onClick={() => props.changePage(props.page - 1)}>{props.page - 1}</button>
                    <button className="actualPage">{props.page}</button>
                    <button id="next1" onClick={() => props.changePage(props.page + 1)}>{props.page + 1}</button>
                    <button id="next2" onClick={() => props.changePage(props.page + 2)}>{props.page + 2}</button>
                    <button onClick={() => props.changePage(lastPage)}>&gt;&gt;</button>
                </div>
            </div>
        )
    }

};

export default Pagination;
