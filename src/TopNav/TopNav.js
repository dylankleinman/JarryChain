import React, {useEffect, Component} from 'react';
import NavItem from './NavItem/NavItem';
import './TopNav.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jerry from '../img/IMG_1575.png';
import ConnectButton from './walletConnect/connectButton';

class TopNav extends Component{

    constructor(props){
        super(props)
        this.state={
            userAddress: '',
        }
    }

    callbackFunction = (childData) => {
        this.setState({userAddress: childData}, () => {
            this.props.parentCallback(this.state.userAddress)
        })
    }


    render(){
        return(
            <Navbar className="topnav" expand="lg">
                <Navbar.Brand to="/"><img style={{ width: '65px' }} alt="jerryphoto" src={jerry}></img></Navbar.Brand>
                <NavLink to="/"><Navbar.Brand>JerryChain</Navbar.Brand></NavLink>
                <NavLink to="/Portfolio"><Navbar.Brand>My Portfolio</Navbar.Brand></NavLink>
                <NavItem path="/History">History</NavItem>
                <ConnectButton parentCallback = {this.callbackFunction}></ConnectButton>
            </Navbar>
        )
    }
}

export default TopNav;