import React from "react";
import CoinTable from './CoinTable/CoinTable'
import Header from '../Home/Header/Header'

const Portfolio = (props) => {
        return(
            <div>
                <Header></Header>
                <CoinTable address={props.address}></CoinTable>
            </div>
        )
}

export default Portfolio;