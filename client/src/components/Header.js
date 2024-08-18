import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HeaderAccount from "./HeaderAccount";

class Header extends Component {
    render() {
        return (
            <Navbar className="bg-body-tertiary" sticky="top" expand="lg">
                <Container className="mt-auto">
                    <Navbar.Brand href="/">Fishing Shop</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-between">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <HeaderAccount />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;