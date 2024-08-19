import React, { Component } from 'react'

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { withAuthStore } from '../stores/AuthStore'
import AdminDropdownItems from './AdminDropdownItems';

class HeaderAccount extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        this.state.authStore.removeToken()
    }

    render() {
        return (
            this.state.authStore.isValid()
                ?
                <Nav className="d-flex gap-2">
                    <DropdownButton title={this.state.authStore.user.name}>
                        <AdminDropdownItems />
                        <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
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