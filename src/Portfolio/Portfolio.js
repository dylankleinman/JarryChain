import React, {Component} from "react";
import CoinTable from './CoinTable/CoinTable'

const Portfolio = (props) => {
        return(
            <CoinTable address={props.address}></CoinTable>
        )
}

export default Portfolio;