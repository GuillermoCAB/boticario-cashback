import React from 'react';

import ErrorImg from '../ErrorImg'
import EmptyImg from '../EmptyImg'

import loader from '../../assets/img/searchLoader.svg'

import './styles.css';

const Grid = (props) => {

    const verifyStatus = (status) => {
        switch (status) {
            case 0:
                return <div className="itemStatusBox yellow">Pendente</div>
                break;
            case 1:
                return <div className="itemStatusBox green">Aprovado</div>
                break;
            case 2:
                return <div className="itemStatusBox red">Reprovado</div>
                break;

            default:
                return <div className="itemStatusBox yellow">Pendente</div>
                break;
        }
    }
    
    if (props.loading) {
        return (
            <img id="gridLoader" src={loader} alt=""/>
        )
    } else if (props.error) {
        return (
            <div className="gridWrapper">
                <ErrorImg />
            </div>
        )
    } else if (!props.items.length) {
        return (
            <EmptyImg />
        )
    } else {
        return (
            <div className="gridWrapper">
                {props.items.map(item => { return (
                    <div className="gridItem" key={item.id}>

                        <div className="itemHeader">

                            <div className="statusRow">
                                STATUS
                                {verifyStatus(item.status)}
                            </div>   

                            <p>{item.date}</p>

                        </div>

                        <div className="cashbackRow">                
                            <p>R${item.cbValue}</p>
                            <span>Cashback</span>  
                        </div>

                        <div className="itemRow">                               
                            <p>Valor R${item.value}</p>                       
                            <p>Percentual: {item.cbPercent}</p>
                        </div>

                        <div className="itemRow">                        
                            <p className="itemCode">Código: {item.purchaseCode}</p>                       
                        </div>

                    </div>
                )})}
                </div>
        )

    }
};

export default Grid;
