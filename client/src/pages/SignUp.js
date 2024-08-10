import React, { Component } from 'react';
import axios from 'axios'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';
import DependenciesContext from '../services/DependenciesContext';


class SignUp extends Component {
    static contextType = DependenciesContext;
    componentDidMount() {
        this.alertMessageContainerRef = this.context.alertMessageContainerRef;
    }

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        axios.post("http://localhost:5000/users/reg", {
            name: data.get("name"),
            email: data.get("email"),
            password: data.get("password"),
            phone: data.get("phone")
        })
        .then(res => {
            console.log(res)
            const successMessage = res.data?.message || res.message || 'A message occurred';
            this.alertMessageContainerRef.current.createMessage(successMessage, "success");
            window.location.href = "/login"
        })
        .catch(err => {
            const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
            this.alertMessageContainerRef.current.createMessage(errorMessage, "danger");
        })
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <div style={{ width: "450px" }}>
                    <h1 className='text-center'>Sign Up</h1>
                    <Form className='mt-3' onSubmit={this.submit}>
                        <Stack gap={3}>
                            <FloatingLabel label="Name">
                                <Form.Control name="name" type="text" placeholder="Name" />
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
                            <Button type='submit' className='btn-success w-100'>Confirm</Button>
                        </Stack>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SignUp;