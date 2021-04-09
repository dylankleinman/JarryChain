import React, {Component} from 'react';
import Web3 from 'web3';
import { isUserEthereumAddressInBloom } from 'web3-utils';
import bootstrapCard from '../Cards/Card/Card';
import Cards from '../Cards/Cards'

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            account: '',
            coins:[],
        }
    }

    componentWillMount(){
        console.log('mounted');
        //this.loadBlockchainData();
        //this.loadData();
    }

    // async loadBlockchainData(){
    //     const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    //     const network = await web3.eth.net.getNetworkType();
    //     const accounts = await web3.eth.requestAccounts();
    //     console.log("network: "+accounts[0]);
    //     this.setState({account:accounts[0]});
    // }

    async loadData(){
        try {
            // Promise.all() lets us coalesce multiple promises into a single super-promise
            var data = await Promise.all([
              // fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()),// parse each response as json
              fetch('https://api.coingecko.com/api/v3/global')
                  .then((response) => response.json())
                  .then(data => { 
                      console.log(data);
                      //console.log (data);
                    //   Flapdata = data.data;
                    //   fillCarousel(data.data);
                  }),
              fetch('https://api.coingecko.com/api/v3/search/trending',
                  {mode: 'cors'},
                  {headers : { 
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                  }})
                  .then(response => response.json())
                  .then(
                      data => {
                          console.log(data);
                          this.setState({coins: data.coins});
                      })
            ]);
          } catch (error) {
            console.log(error);
          }
    }

    render(){
        return(
            <div className="container">
                {/* <h1>Your Account: {this.state.account}</h1> */}
                {/* {this.state.coins.map(element => 
                    <div>card</div>
                    //<Card title={element.title} body={element.body} key={element.id}/>
                )} */}
                <Cards></Cards>
            </div>
        )
    }
}

export default Home;