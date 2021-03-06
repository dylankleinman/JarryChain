import React from 'react';
import './CoinRow.css';
import ReactTooltip from "react-tooltip"

const CoinRow = (props) => {

    return(
        <div className={props.class} onClick={props.clicked}>
            <ReactTooltip place="top" type="dark" effect="float"/>
            <div>{props.image ? <img src={props.image} alt="img"></img> : ''}</div>
            <div className="coinName" data-tip={props.tooltip}>{props.name}</div>
            <div>{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div className="">{props.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div className="balanceUSD">{props.balanceUSD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
            <div className="oneDay">{props.oneDay ? props.oneDay : ''}</div>
            <div className="sevenDay">{props.sevenDay ? props.sevenDay : ''}</div>
        </div>
    )
};

export default CoinRow;