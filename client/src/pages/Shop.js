import React, { Component } from 'react';
import axios from '../api/axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { withAlertMessagesStore } from '../stores/AlertMessagesStore';
import { withAuthStore } from '../stores/AuthStore';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.state, products: [] }

        this.getProucts = this.getProucts.bind(this)
    }

    componentDidMount() {
        this.getProucts()
    }

    getProucts() {
        axios.get("/products/all", {
            headers: {
                Authorization: 'Bearer ' + this.state.authStore.token
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data })
            })
            .catch(err => {
                console.log(err)
                const errorMessage = err.response?.data?.message || 'Fetch products failed!';
                this.state.alertMessagesStore.addMessage(errorMessage, "danger");
            });

    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row row-cols-4 gap-2">
                        {this.state.products.map(({ _id, image, name, description, price, category, stock }, index) => (
                            <Card style={{ width: '18rem' }} className='col'>
                                <Card.Img variant="top" src={image} />
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Text>
                                        ${price}<br/>
                                        {description}
                                    </Card.Text>
                                    <Button variant="primary">Buy</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuthStore(withAlertMessagesStore(Shop));