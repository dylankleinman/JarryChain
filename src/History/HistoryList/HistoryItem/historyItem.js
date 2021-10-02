import React from 'react'
import './historyItem.css'

const HistoryItem = (props) => {
    return(
        <div className="historyItem">
            <div className="historyItemRow">{props.date}</div>
            <div>Tx ID: {props.txHash}</div>
            <div>From: {props.from}</div>
            <div>To: {props.to}</div>
            <div>Token Address: {props.tokenAddress}</div>
            <div>Token Name: {props.tokenName}</div>
            <div>Token Value: {props.value} {props.tokenSymbol}</div>
            <div>Type: {props.type}</div>
            <hr style={{backgroundColor:"white", opacity: '20%'}}></hr>
        </div>
    )
}

export default HistoryItem;