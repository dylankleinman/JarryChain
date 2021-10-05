import React, {Component} from 'react';
import './historyList.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import HistoryItem from './HistoryItem/historyItem'
import Decimal from 'decimal.js';


class HistoryList extends Component {

    constructor(props){
        super(props)
        this.state = {
            address: '',
            isConnected: false,
            isFetching: false,
            addressHistory: [],
            pageCount:'',
            pageDisplayed: 0,
        }
        this.myRef = React.createRef()  
    }

    componentDidUpdate(props){
        this.checkNewAddress(this.props.address)
    }

    componentDidMount(props){
        this.checkNewAddress(this.props.address)
    }

    checkNewAddress = (newAddress) => {
       if(this.state.address !== newAddress && newAddress !==''){
            this.setState({
                address: newAddress,
                isConnected: true,
            })
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
        this.setState({isFetching: true});
        axios.get('https://api.ethplorer.io/getAddressHistory/'+ address +'?apiKey=EK-ceqe4-UKc2A15-7hUWQ&limit=100')
            .then(response => {
                this.setState({
                    pageCount: Math.round(response.data.operations.length/10),
                    pageDisplayed: 0,
                    addressHistory: [],
                })
                while (response.data.operations.length > 0){
                    this.setState({
                        addressHistory: [...this.state.addressHistory, response.data.operations.splice(0,10)]
                    })
                }
                this.setState({isFetching:false})
            })
    }

    render(){
        return(
            <div className="historyList" ref={this.myRef}>
                <div>Address History</div>
                <hr style={{backgroundColor:"white"}}></hr>
                <div>
                    {this.state.isConnected ? 
                        this.state.isFetching ? 'Loading':
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
                        : 'Please Connect Wallet For Address History'
                    }
                </div>
            </div>
        )
    }
}

export default HistoryList;