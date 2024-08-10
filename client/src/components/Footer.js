import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends Component {
    render() {
        return (
            <Navbar className='bg-body-tertiary py-4 mt-auto'>
                <Container className='d-flex flex-column'>
                    <Nav className='w-100 justify-content-center border-bottom pb-3 mb-3'>
                        <Nav.Link href='/' className='px-2'>Home</Nav.Link>
                    </Nav>
                    <Navbar.Text className='text-center'>
                        © 2024 Company, Inc
                    </Navbar.Text>
                </Container>
            </Navbar>
        )
    }
}

export default Footer;