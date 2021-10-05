import React, {Component} from 'react';
import NavItem from './NavItem/NavItem';
import './TopNav.css';
import {Navbar, Nav} from 'react-bootstrap';
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
            <div>
                <Navbar collapseOnSelect variant="dark" className="topnav" expand="lg">
                    <Navbar.Brand to="/"><img style={{ width: '65px' }} alt="jerryphoto" src={jerry}></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/"><Navbar.Brand>JerryChain</Navbar.Brand></NavLink>
                        </Nav>
                        <Nav>
                            <NavLink to="/Portfolio"><Navbar.Brand>My Portfolio</Navbar.Brand></NavLink>
                        </Nav>
                        <Nav>
                            <NavItem path="/History">History</NavItem>
                        </Nav>
                        <Nav>
                            <ConnectButton parentCallback = {this.callbackFunction}></ConnectButton>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default TopNav;