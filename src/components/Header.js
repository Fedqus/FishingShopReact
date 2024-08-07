import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

class Header extends Component {
    render() {
        return (
            <Navbar bg="light" data-bs-theme="light" expand="lg">
                <Container>
                    <Navbar.Brand href="">Fishing Shop</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-between">
                        <Nav>
                            <Nav.Link href="">Home</Nav.Link>
                        </Nav>
                        <Nav className="d-flex gap-2">
                            <Button>Login</Button>
                            <Button>Sign Up</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Header;