import React, { Component } from 'react'

import Nav from 'react-bootstrap/Nav';

import { withAuthStore } from '../stores/AuthStore'

class NavLinks extends Component {
    constructor(props) {
        super(props);
        this.links = [
            { href: '/', title: 'Home' }
        ]
    }
    render() {
        return (
            <Nav className={this.props.className}>
                {this.links.map(({ href, title }, index) => (
                    <Nav.Link key={index} href={href}>{title}</Nav.Link>
                ))}
            </Nav>
        )
    }
}

export default withAuthStore(NavLinks)