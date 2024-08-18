import React, { Component } from 'react';
import axios from '../api/axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';
import { withAlertMessagesStore } from '../stores/AlertMessagesStore';
import { withAuthStore } from '../stores/AuthStore';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        const data = new FormData(e.target);

        axios.post("/users/login", {
            email: data.get("email"),
            password: data.get("password"),
        })
        .then(res => {
            const successMessage = res.data?.message || 'Login successful!';
            this.state.alertMessagesStore.addMessage(successMessage, "success");
            this.state.authStore.login(res.data?.token);
            window.location.href = "/";
        })
        .catch(err => {
            const errorMessage = err.response?.data?.message || 'Login failed!';
            this.state.alertMessagesStore.addMessage(errorMessage, "danger");
        });
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div style={{ width: "450px" }}>
                    <h1 className='text-center'>Login</h1>
                    <Form className='mt-3' onSubmit={this.handleSubmit}>
                        <Stack gap={3}>
                            <FloatingLabel label="Email">
                                <Form.Control name="email" type="text" placeholder="Email" />
                            </FloatingLabel>
                            <FloatingLabel label="Password">
                                <Form.Control name="password" type="password" placeholder="Password" />
                            </FloatingLabel>
                            <Button type='submit' variant='success' className='w-100'>Login</Button>
                        </Stack>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withAuthStore(withAlertMessagesStore(Login));
