import React from 'react';
import './CoinRow.css';
import ReactTooltip from "react-tooltip"

const CoinRow = (props) => {

    return(
        <div className={props.class} onClick={props.clicked}>
            <ReactTooltip place="top" type="dark" effect="float"/>
            <div>{props.image ? <img src={props.image}></img> : ''}</div>
            <div className="coinName" data-tip={props.tooltip}>{props.name}</div>
            <div>{props.price}</div>
            <div>{props.balance}</div>
            <div>{props.balanceUSD}</div>
            <div>{props.oneDay}</div>
            <div>{props.sevenDay}</div>
        </div>
    )
};

export default CoinRow;