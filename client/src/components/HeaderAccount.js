import React, { Component } from 'react'

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { withAuthStore } from '../stores/AuthStore'

class HeaderAccount extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout() {
        this.state.authStore.logout()
    }

    render() {
        return (
            this.state.authStore.isValid()
                ?
                <Nav className="d-flex gap-2">
                    <DropdownButton title={this.state.authStore.user.name}>
                        <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                    </DropdownButton>
                </Nav>
                :
                <Nav className="d-flex gap-2">
                    <Button href="/login">Login</Button>
                    <Button href="/signup">Sign Up</Button>
                </Nav>
        )
    }
}

export default withAuthStore(HeaderAccount)