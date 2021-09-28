import React, {Component} from 'react';
import CoinRow from './CoinRow/CoinRow';
import './CoinTable.css';
import axios from 'axios';
import Decimal from 'decimal.js';
import {SpinnerDiamond} from 'spinners-react';
import coinGif from '../../img/bitcoin.gif';



class CoinTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            isConnected: false,
            isConnecting: false,
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
            axios.get('http://api.ethplorer.io/getAddressInfo/'+this.props.address+'?apiKey=EK-ceqe4-UKc2A15-7hUWQ')
            .then(response => {
                console.log(response);
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

    render(){
        return(
            <div className="coinTable">
                <CoinRow class="coinHeader" name="Coin Name" image={coinGif} price="Price (USD)" balance="Portfolio Balance" balanceUSD = "Portfolio Balance (USD)" oneDay="One Day Change" sevenDay="Seven Day Change"></CoinRow>
                <hr style={{backgroundColor:"white"}}></hr>
                <div>{this.state.isConnected ? '' : (this.state.isConnecting ? '' : 'Please Connect Wallet to View Tokens')}</div>
                {this.state.isConnecting ? <SpinnerDiamond color="rgb(245, 171, 65)" size="100"></SpinnerDiamond> : 
                    (this.state.isConnected ?
                        [
                            <CoinRow class="coinRow" key="ethereememmm" name='Eth' tooltip='Ethereum' image='https://ethplorer.io/images/eth.png' balanceUSD = {(Number(this.state.ethInfo.balance)*Number(this.state.ethPrice.rate)).toFixed(2)} price={Number(this.state.ethPrice.rate).toFixed(2)} balance={Number(this.state.ethInfo.balance).toFixed(2)} oneDay={this.state.ethPrice.diff} sevenDay={this.state.ethPrice.diff7d}></CoinRow>,
                            this.state.coinList.map(element => 
                                <CoinRow class="coinRow" key={element.tokenInfo.address} tooltip={element.tokenInfo.name} name={element.tokenInfo.symbol} image={'https://ethplorer.io' + element.tokenInfo.image} balanceUSD = {(Number(element.tokenInfo.price.rate)*this.formatBalance(element)).toFixed(2)} price={Number(element.tokenInfo.price.rate).toFixed(2)} balance={this.formatBalance(element)} oneDay={element.tokenInfo.price.diff} sevenDay={element.tokenInfo.price.diff7d}></CoinRow>
                            )
                        ]
                    : '')
                }
            </div>
        )
    }
}

export default CoinTable;