import React, { Component } from 'react'
import axios from '../../api/axios'

import Table from 'react-bootstrap/Table';
import { withAuthStore } from '../../stores/AuthStore';
import { withAlertMessagesStore } from '../../stores/AlertMessagesStore';



class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.state, users: [] }

        this.getUsers = this.getUsers.bind(this)
    }
    
    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get("/users/all", {
            headers: {
                Authorization: 'Bearer ' + this.state.authStore.token
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.log(err)
                const errorMessage = err.response?.data?.message || 'Fetch users failed!';
                this.state.alertMessagesStore.addMessage(errorMessage, "danger");
            });

    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Roles</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map(({name, email, phone, roles}, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{phone}</td>
                            <td>{roles}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default withAlertMessagesStore(withAuthStore(Users))