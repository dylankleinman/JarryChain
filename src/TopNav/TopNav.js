import React from 'react';
import NavItem from './NavItem/NavItem';
import './TopNav.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jerry from '../img/IMG_1575.png';

const TopNav = () => {
    return(
        // <div className="topnav">
        //     <NavItem  path="/">Home</NavItem>
        //     <NavItem  path="/">Users</NavItem>
        //     <NavItem  path="/Posts">Posts</NavItem>
        // </div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand to="/"><img style={{ width: '65px' }} alt="jerryphoto" src={jerry}></img></Navbar.Brand>
            <NavLink to="/"><Navbar.Brand>JerryChain</Navbar.Brand></NavLink>
            <NavItem path="/Posts">Posts</NavItem>
            <NavItem path="/Other">Other</NavItem>
            {/* <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse> */}
        </Navbar>
    )
}

export default TopNav;