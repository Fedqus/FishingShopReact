import React, { Component } from 'react';
import axios from '../api/axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';
import { withAlertMessagesStore } from '../stores/AlertMessagesStore';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        const data = new FormData(e.target)
        
        axios.post("/users/reg", {
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password"),
            phone: data.get("phone")
        })
        .then(res => {
            const successMessage = res.data?.message || res.message || 'A message occurred';
            this.state.alertMessagesStore.addMessage(successMessage, "success");
            window.location.href = "/login"
        })
        .catch(err => {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            this.state.alertMessagesStore.addMessage(errorMessage, "danger");
        })
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div style={{ width: "450px" }}>
                    <h1 className='text-center'>Sign Up</h1>
                    <Form className='mt-3' onSubmit={this.handleSubmit}>
                        <Stack gap={3}>
                            <FloatingLabel label="Full name">
                                <Form.Control name="name" type="text" placeholder="Full name" />
                            </FloatingLabel>
                            <FloatingLabel label="Email">
                                <Form.Control name="email" type="text" placeholder="Email" />
                            </FloatingLabel>
                            <FloatingLabel label="Phone">
                                <Form.Control name="phone" type="text" placeholder="Phone" />
                            </FloatingLabel>
                            <FloatingLabel label="Password">
                                <Form.Control name="password" type="password" placeholder="Password" />
                            </FloatingLabel>
                            <Button type='submit' variant='success' className='w-100'>Confirm</Button>
                        </Stack>
                    </Form>
                </div>
            </div>
        )
    }
}

export default withAlertMessagesStore(SignUp);