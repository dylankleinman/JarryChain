import React from 'react';
import Header from '../Home/Header/Header'
import HistoryList from './HistoryList/historyList'

const History = (props) =>{
    return(
        <div>
            <Header></Header>
            <HistoryList address={props.address}></HistoryList>
        </div>
    )
} 

export default History;