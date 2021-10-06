import React, {Component} from 'react';
import CoinRow from './CoinRow/CoinRow';
import './CoinTable.css';
import axios from 'axios';
import Decimal from 'decimal.js';
import {SpinnerDiamond} from 'spinners-react';
import coinGif from '../../img/bitcoin.gif';
import CoinModal from '../../Home/Modal/Modal';
import SearchBar from '../../External/SearchBar/SearchBar';
import InvalidAddressToast from '../../External/InvalidAddressToast/InvalidAddressToast';

const apiKey = process.env.REACT_APP_API_KEY;

class CoinTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            isConnected: false,
            isConnecting: false,
            coinID: '',
            showModal: false,
            showToast: false,
            messageArrayVal : 0,
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
        if(this.props.address !== '' && this.state.isConnected !== true){
            this.getData(this.props.address);
        }
    }

    async componentDidUpdate(prevProps, prevState){
        if(this.props.address !== '' && this.state.isConnected !== true && this.state.isConnecting === false){
            this.getData(this.props.address);
        }
        if(prevProps.address !== this.props.address && this.props.address !== ''){
            this.getData(this.props.address);
        }
        if(this.props.address === '' && prevProps.address !== this.props.address){
            this.setState({
                isConnected: false,
                isConnecting: false,
            })
        }
    }

    getData = (address) => {
        this.setState({
            isConnecting: true,
        })
        try{
            axios.get('https://api.ethplorer.io/getAddressInfo/'+address+'?apiKey=' + apiKey)
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
            }).catch((error) => {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    if(error.response.data.error.message === 'Invalid address format'){
                        this.setState({
                            isConnecting: false,
                            showToast: true,
                            messageArrayVal: Math.floor(Math.random() * 5)
                        })
                        setTimeout(() => {
                            this.setState({showToast: false});
                          }, 2000)
                    }
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }

            });
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

    //this function is called when the search bar component has an input that is submitted
    inputCallBackFunction = (childData) => {
        this.getData(childData);
    }

    render(){
        return(
            <div className="coinTable">
                <CoinModal show={this.state.showModal} coinID={this.state.coinID} coinName={this.state.coinName}></CoinModal>
                <CoinRow class="coinHeader" name="Coin Name" image={coinGif} price="Price (USD)" balance="Portfolio Balance" balanceUSD = "Portfolio Balance (USD)" oneDay="One Day Change" sevenDay="Seven Day Change"></CoinRow>
                <hr style={{backgroundColor:"white"}}></hr>
                <div>
                    {this.state.isConnected ? '' : (this.state.isConnecting ? '' : <SearchBar parentCallback = {this.inputCallBackFunction}></SearchBar>)}
                </div>
                {this.state.isConnecting ? <SpinnerDiamond color="rgb(245, 171, 65)" size="100"></SpinnerDiamond> : 
                    (this.state.isConnected ?
                        [
                            // <div style={{textAlign: 'left', fontSize: '.9rem'}}>Displaying Tokens For Address: {this.props.address}</div>,
                            <CoinRow class="coinRow" key="ethereememmm" clicked={() => this.showModal('ethereum', 'Ethereum')} name='Eth' tooltip='Ethereum' image='https://ethplorer.io/images/eth.png' balanceUSD = {(Number(this.state.ethInfo.balance)*Number(this.state.ethPrice.rate)).toFixed(2)} price={Number(this.state.ethPrice.rate).toFixed(2)} balance={Number(this.state.ethInfo.balance).toFixed(2)} oneDay={this.state.ethPrice.diff} sevenDay={this.state.ethPrice.diff7d}></CoinRow>,
                            this.state.coinList.map(element => 
                                <CoinRow class="coinRow" clicked={() => this.showModal(element.tokenInfo.coingecko, element.tokenInfo.name)} key={element.tokenInfo.address} tooltip={element.tokenInfo.name} name={element.tokenInfo.symbol} image={element.tokenInfo.image ? 'https://ethplorer.io' + element.tokenInfo.image : ''} balanceUSD = {(Number(element.tokenInfo.price.rate)*this.formatBalance(element)).toFixed(2)} price={Number(element.tokenInfo.price.rate).toFixed(2)} balance={this.formatBalance(element)} oneDay={element.tokenInfo.price.diff} sevenDay={element.tokenInfo.price.diff7d}></CoinRow>
                            )
                        ]
                    : '')
                }
                <InvalidAddressToast show={this.state.showToast} messageArrayVal={this.state.messageArrayVal}></InvalidAddressToast>
            </div>
        )
    }
}

export default CoinTable;