import React, { Component } from 'react';
import { withPermission } from '../decorators/PermissionDecorator';
import { withAuthStore } from '../stores/AuthStore';
import Forbidden from './Errors/Forbidden';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Users from './Dashboard/Users';
import Products from './Dashboard/Products';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Tabs
                    defaultActiveKey="users"
                    id="uncontrolled-tab-example"
                    className="my-3"
                >
                    <Tab eventKey="users" title="Users">
                        <Users />
                    </Tab>
                    <Tab eventKey="products" title="Products">
                        <Products />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default withPermission('ADMIN', <Forbidden />)(withAuthStore(Dashboard));