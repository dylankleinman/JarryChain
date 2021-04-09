import React from 'react';
import './NavItem.css';
import {NavLink} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const NavItem = (props) => {
    return (
        <NavLink to={props.path}><Navbar.Brand>{props.children}</Navbar.Brand></NavLink>
        // <NavLink to={props.path} activeClassName="active">{props.children}</NavLink>
    )
}

export default NavItem;