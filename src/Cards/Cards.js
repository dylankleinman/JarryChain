import React, {Component} from 'react';
//import Card from './Card/Card';
import './Cards.css';
import axios from 'axios';
import Bootstrapcard from './Card/Card';

class Cards extends Component {

    state = {
        posts:[],
        homePageCoins : []
    }

    componentDidMount(){
        axios.get('https://api.coingecko.com/api/v3/search/trending')
            .then(response => {
                this.setState({homePageCoins: response.data.coins});
                console.log(this.state.homePageCoins);
            })
    }

    render() {
        return(
            <div className="Cards">
                {this.state.homePageCoins.map(element => 
                    <Bootstrapcard key={element.item.id} name = {element.item.name} img={element.item.large} rank = {element.item.market_cap_rank}></Bootstrapcard>
                )}
                
            </div>
        )
    }
}

export default Cards;