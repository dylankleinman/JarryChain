import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './connectButton.css';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

class ConnectButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isConnecting: false,
            isConnected: false,
            connectWalletButtonVal: 'Connect Wallet',
            connectedAccountNumber: '',
            connectedAccountEthBalance: '',
        }
    }

    //Check to see if wallet is already connected to site
    async componentDidMount(){
        const account = await window.ethereum.request({ method: 'eth_accounts' });
        const accountEthBalance = await this.getAccountEthBalance(account[0]);
        if(account[0]!=null){
            const setStates = () => {
                this.setState({
                    isConnected:true,
                    connectedAccountNumber:account[0],
                    connectWalletButtonVal: account[0].substring(0,8) + '...',
                })
            }
            setStates();
        } else {
            console.log('no wallet');
        }
    }

    //When user clicks connect wallet
    getAccount = async () => {
        this.setState({isConnecting: true})
        try{
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return account;
        } catch (err){
            console.log(err);
            return;
        }
    }

    getAccountEthBalance = async (account) => {
        const ethBalance = await web3.eth.getBalance(account)
        return web3.utils.fromWei(ethBalance);
    }

    clickHandler = async () => {
        // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
          }
        if(!this.state.isConnected){
            const accounts = await this.getAccount();
            if(accounts != undefined){
                const account = accounts[0];
                const ethBalance = this.getAccountEthBalance(account)
                this.setState({
                    connectedAccountNumber: accounts[0],
                    connectedAccountEthBalance: ethBalance,
                    connectWalletButtonVal: accounts[0].substring(0,8) + '...',
                })
            } else {
                console.log("no account");
            }
        }
        this.setState({isConnecting: false})
    }

    render () {
        return(
            <Button variant="outline-dark" onClick = {this.clickHandler}>{this.state.isConnecting? 'loading' : this.state.connectWalletButtonVal}</Button>
        )
    }
}

export default ConnectButton;