import React, {Component} from 'react';
import Web3 from 'web3';
// import { isUserEthereumAddressInBloom } from 'web3-utils';
// import bootstrapCard from '../Cards/Card/Card';
import Cards from './Cards/Cards';
import Header from './Header/Header';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: '',
        }
    }

    render(){
        return(
            <div className="container">
                <Header></Header>
                <Cards></Cards>
            </div>
        )
    }
}

export default Home;