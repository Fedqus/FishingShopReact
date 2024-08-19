import React, { Component } from 'react'

import Dropdown from 'react-bootstrap/Dropdown';

import { withAuthStore } from '../stores/AuthStore'
import { withPermission } from '../decorators/PermissionDecorator';

class AdminDropdownItems extends Component {
    render() {
        return (
            <div>
                <Dropdown.Item href='/dashboard'>Dashboard</Dropdown.Item>
                <Dropdown.Divider />
            </div>
        )
    }
}

export default withPermission('ADMIN')(withAuthStore(AdminDropdownItems))