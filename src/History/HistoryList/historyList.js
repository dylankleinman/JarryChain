import React, {Component} from 'react';
import './historyList.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import HistoryItem from './HistoryItem/historyItem'
import Decimal from 'decimal.js';
import {SpinnerDiamond} from 'spinners-react';
import SearchBar from '../../External/SearchBar/SearchBar'
import InvalidAddressToast from '../../External/InvalidAddressToast/InvalidAddressToast'

const apiKey = process.env.REACT_APP_API_KEY;

class HistoryList extends Component {

    constructor(props){
        super(props)
        this.state = {
            address: '',
            isConnected: false,
            isConnecting: false,
            addressHistory: [],
            pageCount:'',
            pageDisplayed: 0,
            noTransactionHistory: false,
            showToast: false,
        }
        this.myRef = React.createRef()  
    }

    async componentDidMount(){
        if(this.props.address !== '' && this.state.isConnected !== true){
            this.fetchHistory(this.props.address);
        }
    }

    async componentDidUpdate(prevProps, prevState){
        if(this.props.address !== '' && this.state.isConnected !== true && this.state.isConnecting === false){
            this.fetchHistory(this.props.address);
        }
        if(prevProps.address !== this.props.address && this.props.address !== ''){
            this.fetchHistory(this.props.address);
        }
        if(this.props.address === '' && prevProps.address !== this.props.address){
            this.setState({
                isConnected: false,
                isConnecting: false,
            })
        }
    }

    checkNewAddress = (newAddress) => {
       if(this.state.address !== newAddress && newAddress !==''){
            this.fetchHistory(newAddress);
        }
    }

    formatBalance = (value, decimals) => {
        const num = new Decimal(value).toFixed()
        const decimalPos = num.length - decimals
        let formattedBalance = `${num.slice(0, decimalPos)}.${num.slice(decimalPos)}`
        formattedBalance = Number(formattedBalance).toFixed(2)
        return formattedBalance
    }

    handlePageClick = (data) => {
        this.setState({
            pageDisplayed: data.selected,
        });
        this.myRef.current.scrollIntoView();
    }

    fetchHistory = (address) => {
        this.setState({
            isConnecting: true,
            noTransactionHistory: false,
            addressHistory: [],
        });
        axios.get('https://api.ethplorer.io/getAddressHistory/'+ address +'?apiKey='+apiKey+'&limit=100')
            .then(response => {
                this.setState({
                    pageCount: Math.round(response.data.operations.length/10),
                    pageDisplayed: 0,
                })
                if(response.data.operations.length !== 0){
                    while (response.data.operations.length > 0){
                        this.setState({
                            addressHistory: [...this.state.addressHistory, response.data.operations.splice(0,10)]
                        })
                    }
                } else {
                    this.setState({
                        noTransactionHistory: true,
                    })
                }
                this.setState({
                    isConnecting:false, 
                    isConnected: true,
                })
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
    }

    //this function is called when the search bar component has an input that is submitted
    inputCallBackFunction = (childData) => {
        this.fetchHistory(childData);
    }

    render(){
        return(
            <div className="historyList" ref={this.myRef}>
                <div>Address History</div>
                <hr style={{backgroundColor:"white"}}></hr>
                <div>
                    {this.state.isConnected ? '' : (this.state.isConnecting ? '' : <SearchBar parentCallback = {this.inputCallBackFunction}></SearchBar>)}
                </div>
                <div>
                    {this.state.isConnecting ? <SpinnerDiamond color="rgb(245, 171, 65)" size="100"></SpinnerDiamond> : 
                        this.state.isConnected ? 
                                this.state.noTransactionHistory ? 'No Transaction History Available' : 
                                [
                                    this.state.addressHistory[this.state.pageDisplayed].map(element => 
                                        <HistoryItem date={new Date((element.timestamp)*1000).toLocaleDateString("en-US")} to={element.to} from={element.from} type={element.type} tokenAddress={element.tokenInfo.address} tokenSymbol={element.tokenInfo.symbol} tokenName={element.tokenInfo.name} txHash={element.transactionHash} value={this.formatBalance(element.value, element.tokenInfo.decimals)}></HistoryItem>
                                    ),
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        nextLabel={'>'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.pageCount}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={4}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'activePage'}
                                    />
                                ]
                        : ''
                    }
                    <InvalidAddressToast show={this.state.showToast} messageArrayVal={this.state.messageArrayVal}></InvalidAddressToast>
                </div>
            </div>
        )
    }
}

export default HistoryList;