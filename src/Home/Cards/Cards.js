import React, {Component} from 'react';
//import Card from './Card/Card';
import './Cards.css';
import axios from 'axios';
import Bootstrapcard from './Card/Card';
import CoinModal from '../Modal/Modal';
import {SpinnerDiamond} from 'spinners-react';

class Cards extends Component {

    state = {
        posts:[],
        homePageCoins : [],
        coinLoading: true,
        showModal: false,
        coinID: '',
        coinName: '',
    }
    
    //when component is ready, search coingecko api for trending coins
    componentDidMount(){
        axios.get('https://api.coingecko.com/api/v3/search/trending')
            .then(response => {
                this.setState({
                    homePageCoins: response.data.coins,
                    coinLoading: false
                });
            })
    }

    //when a card is clicked on, call showModal which changes state to show modal component
    showModal = (id, name) => {
        this.setState({showModal: !this.state.showModal, coinID: id, coinName: name});
    }

    render() {
        return(
            <div><CoinModal show={this.state.showModal} coinID={this.state.coinID} coinName={this.state.coinName}></CoinModal>
            <div class="cardHeader">Top 7 Trending Coins</div>
            {this.state.coinLoading? 
                <div className="spinner"><SpinnerDiamond color="rgb(245, 171, 65)" size="100"/></div> : 
                <div className="Cards">
                    {this.state.homePageCoins.map(element => 
                        <Bootstrapcard key={element.item.id} name = {element.item.name} img={element.item.large} rank = {element.item.market_cap_rank} clicked={() => this.showModal(element.item.id, element.item.name)}></Bootstrapcard>
                    )}
                </div>
            }
            </div>
        )
    }
}

export default Cards;