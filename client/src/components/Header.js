import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import HeaderAccount from "./HeaderAccount";
import NavLinks from "./NavLinks";

class Header extends Component {
    render() {
        return (
            <Navbar className="bg-body-tertiary" sticky="top" expand="lg">
                <Container className="mt-auto">
                    <Navbar.Brand href="/">Fishing Shop</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-between">
                        <NavLinks />
                        <HeaderAccount />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;