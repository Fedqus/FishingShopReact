import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavLinks from './NavLinks';

class Footer extends Component {
    render() {
        return (
            <Navbar className='bg-body-tertiary py-4 mt-auto'>
                <Container className='d-flex flex-column'>
                    <NavLinks className='w-100 justify-content-center border-bottom pb-3 mb-3' />
                    <Navbar.Text className='text-center'>
                        © 2024 Company, Inc
                    </Navbar.Text>
                </Container>
            </Navbar>
        )
    }
}

export default Footer;