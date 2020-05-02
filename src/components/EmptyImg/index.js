import React from 'react';

import emptyPng from '../../assets/img/search-list.png'

import './styles.css';

const EmptyImg = (props) => {

    return (
        <div className="emptyWrapper">
            <img src={emptyPng} alt="" className="emptyImg"/>
            <p className="emptyText">Você ainda não possui compras cadastradas para exibir.</p>
            <p className="emptyText">Utilize o botão '+ Cadastrar Compra' para adicionar uma nova.</p>
        </div>
    )
}

export default EmptyImg;
