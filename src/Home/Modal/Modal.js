import React,{Component} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Modal.css';
import {SpinnerDiamond} from 'spinners-react';
import Coinchart from './Chart';


class CoinModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            coinID: this.props.coinID,
            coinPrice: '',
            coinName: '',
            coinMarketCap: '',
            coinTicker: '',
            coinImage: '',
            graphData: [],
            isFetching: true,
        }
    }

    //Whenever modal is updated with new props, set showmodal to true and fetch new data for modal
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.show !== prevProps.show) {
            if(this.props.coinID != undefined){
                this.setState({showModal:!this.state.showModal, coinID: this.props.coinID, coinName: this.props.coinName})
                try{
                    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + this.props.coinID + '&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                    .then(response => {
                        this.setState({
                            coinPrice: Math.round(response.data[0].current_price * 100)/100, 
                            coinMarketCap: response.data[0].market_cap,
                            coinTicker: response.data[0].symbol.toUpperCase(),
                            coinImage: response.data[0].image,
                        });
                        axios.get('https://api.coingecko.com/api/v3/coins/'+this.props.coinID+'/market_chart?vs_currency=usd&days=150&interval=daily')
                        .then(data => {
                            data.data.prices.forEach(element =>{
                                this.setState({
                                    graphData: [...this.state.graphData, element],
                                })
                            })
                            this.setState({isFetching: false})
                        })
                    })
                } catch(error){
                    console.log(error);
                }
            }else {
                this.setState({
                    coinID: '',
                    coinName: this.props.coinName,
                    showModal: !this.state.showModal,
                })
            }
        } 
    }

    handleHide = () =>{
        this.setState({showModal: false, graphData: [], isFetching: true})
    }

    render() {
        return(
            <Modal show={this.state.showModal} onHide={() => this.handleHide()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header style={{textAlign: 'center'}}>
        <Modal.Title>{this.state.isFetching ? '': <img style={{marginRight: "5px", height:"40px", width: "40px"}}src={this.state.coinImage}></img>}{this.state.coinName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.coinID ? (this.state.isFetching ?  
                        <SpinnerDiamond color="rgb(245, 171, 65)" size="100"/> : 
                        <div>
                            <div style={{marginBottom: "1rem"}}>{this.state.coinTicker} Price Last 150 Days</div>
                            <Coinchart data={this.state.graphData}></Coinchart>
                            <div className="coinDetails">
                                <div>
                                    Current Price: ${this.state.coinPrice}
                                </div>
                                <div>
                                    Market Cap: ${this.state.coinMarketCap}
                                </div>
                                <div>
                                    Symbol: {this.state.coinTicker}
                                </div>
                            </div>
                        </div>
                    ): <div>No Chart Or Price Data Available</div>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => this.handleHide()}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default CoinModal;
