import React, {Component} from 'react';
import CoinRow from './CoinRow/CoinRow';
import './CoinTable.css';
import axios from 'axios';
import Decimal from 'decimal.js';
import {SpinnerDiamond} from 'spinners-react';
import coinGif from '../../img/bitcoin.gif';
import CoinModal from '../../Home/Modal/Modal';


class CoinTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            isConnected: false,
            isConnecting: false,
            coinID: '',
            showModal: false,
            coinList: [],
            ethInfo: {},
            ethPrice: {},
        }
    }

    formatBalance = (tokenData) => {
        const num = new Decimal(tokenData.balance).toFixed()
        const decimalPos = num.length - tokenData.tokenInfo.decimals
        let formattedBalance = `${num.slice(0, decimalPos)}.${num.slice(decimalPos)}`
        formattedBalance = Number(formattedBalance).toFixed(2)
        return formattedBalance
    }

    async componentDidMount(){
        if(this.props.address != '' && this.state.isConnected != true){
            this.getData();
        }
    }

    async componentDidUpdate(prevProps, prevState){
        if(this.props.address != '' && this.state.isConnected != true && this.state.isConnecting == false){
            this.getData();
        }
        if(prevProps.address != this.props.address){
            this.getData();
        }
        if(this.props.address == '' && prevProps.address != this.props.address){
            this.setState({
                isConnected: false,
                isConnecting: false,
            })
        }
    }

    getData = () => {
        this.setState({
            isConnecting: true,
        })
        try{
            axios.get('https://api.ethplorer.io/getAddressInfo/'+this.props.address+'?apiKey=EK-ceqe4-UKc2A15-7hUWQ')
            .then(response => {
                if(response.data.tokens != null){
                    this.setState({
                        coinList: response.data.tokens,
                    });
                } else {
                    this.setState({
                        coinList: []
                    })
                }
                this.setState({
                    ethInfo: response.data.ETH,
                    ethPrice: response.data.ETH.price,
                    isConnected: true,
                    isConnecting: false,
                });
            })
        }catch(err){
            console.log(err);
        }
    }

    showModal = (id, name) => {
        this.setState({
            showModal: !this.state.showModal, 
            coinID: id, 
            coinName: name
        });
    }

    render(){
        return(
            <div className="coinTable">
                <CoinModal show={this.state.showModal} coinID={this.state.coinID} coinName={this.state.coinName}></CoinModal>
                <CoinRow class="coinHeader" name="Coin Name" image={coinGif} price="Price (USD)" balance="Portfolio Balance" balanceUSD = "Portfolio Balance (USD)" oneDay="One Day Change" sevenDay="Seven Day Change"></CoinRow>
                <hr style={{backgroundColor:"white"}}></hr>
                <div>{this.state.isConnected ? '' : (this.state.isConnecting ? '' : 'Please Connect Wallet to View Tokens In Your Wallet')}</div>
                {this.state.isConnecting ? <SpinnerDiamond color="rgb(245, 171, 65)" size="100"></SpinnerDiamond> : 
                    (this.state.isConnected ?
                        [
                            <CoinRow class="coinRow" key="ethereememmm" clicked={() => this.showModal('ethereum', 'Ethereum')} name='Eth' tooltip='Ethereum' image='https://ethplorer.io/images/eth.png' balanceUSD = {(Number(this.state.ethInfo.balance)*Number(this.state.ethPrice.rate)).toFixed(2)} price={Number(this.state.ethPrice.rate).toFixed(2)} balance={Number(this.state.ethInfo.balance).toFixed(2)} oneDay={this.state.ethPrice.diff} sevenDay={this.state.ethPrice.diff7d}></CoinRow>,
                            this.state.coinList.map(element => 
                                <CoinRow class="coinRow" clicked={() => this.showModal(element.tokenInfo.coingecko, element.tokenInfo.name)} key={element.tokenInfo.address} tooltip={element.tokenInfo.name} name={element.tokenInfo.symbol} image={element.tokenInfo.image ? 'https://ethplorer.io' + element.tokenInfo.image : ''} balanceUSD = {(Number(element.tokenInfo.price.rate)*this.formatBalance(element)).toFixed(2)} price={Number(element.tokenInfo.price.rate).toFixed(2)} balance={this.formatBalance(element)} oneDay={element.tokenInfo.price.diff} sevenDay={element.tokenInfo.price.diff7d}></CoinRow>
                            )
                        ]
                    : '')
                }
            </div>
        )
    }
}

export default CoinTable;