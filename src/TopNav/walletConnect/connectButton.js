import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './connectButton.css';

class ConnectButton extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isConnecting: false,
            isConnected: false,
            connectWalletButtonVal: 'Connect Wallet',
            connectedAccountNumber: '',
            visibility: false,
        }
    }

    //Check to see if wallet is already connected to site
    async componentDidMount(){
        if (typeof window.ethereum !== 'undefined') {
            this.setState({
                visibility: true,
            })
            const account = await window.ethereum.request({ method: 'eth_accounts' });
            if(account[0]!=null && account[0] != undefined){
                this.updateAccountInfo(account[0])
            } else {
                console.log('no wallet');
            }
        }
    }

    async componentDidUpdate(prevProps, prevState){
        window.ethereum.on('accountsChanged', (accounts) => {
            if(accounts [0] == undefined){
                this.setState({
                    isConnected: false,
                    connectWalletButtonVal: 'Connect Wallet',
                    connectedAccountNumber: ''
                })
                this.sendData('')
            }
            if(this.state.connectedAccountNumber != accounts[0] && accounts[0] != undefined){
                this.updateAccountInfo(accounts[0])
                console.log('switched accounts')
            }
        })
    }

    updateAccountInfo = (account) => {
        const setStates = () => {
            this.setState({
                isConnected:true,
                connectedAccountNumber:account,
                connectWalletButtonVal: account.substring(0,8) + '...',
            })
            this.sendData(account); //if address is available send to top component for use in other components
        }
        setStates();
    }

    //this sends the account address back up to the parent component for use in other compnents
    sendData = (account) =>{
        this.props.parentCallback(account);
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

    clickHandler = async () => {
        // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
          }
        if(!this.state.isConnected){
            const accounts = await this.getAccount();
            if(accounts != undefined){
                const account = accounts[0];
                this.setState({
                    connectedAccountNumber: accounts[0],
                    connectWalletButtonVal: accounts[0].substring(0,8) + '...',
                })

                this.sendData(account);
            } else {
                console.log("no account");
            }
        }
        this.setState({isConnecting: false})
    }

    render () {
        return(
            <div style={this.state.visibility ? {} : {display:'none'}}><Button variant="outline-dark" onClick = {this.clickHandler}>{this.state.isConnecting? 'loading' : this.state.connectWalletButtonVal}</Button></div>
        )
    }
}

export default ConnectButton;