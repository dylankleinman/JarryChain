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

    // isInstalled = (web3) =>{
    //     if (typeof web3 !== 'undefined'){
    //         console.log('MetaMask is installed')
    //      } 
    //      else{
    //         console.log('MetaMask is not installed')
    //      }
    // }

    // isLocked = (web3) =>{
    //     web3.eth.getAccounts(function (err, accounts) {
    //         if (err != null) {
    //             console.log(err)
    //         }
    //         else if (accounts.length === 0) {
    //             console.log('MetaMask is locked')
    //         }
    //         else {
    //             console.log('MetaMask is unlocked')
    //         }
    //     });
    // }

    // componentDidMount(){
    //     const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    //     this.isInstalled(web3);
    //     this.isLocked(web3);
    // }

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