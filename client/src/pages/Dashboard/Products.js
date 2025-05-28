import React, { Component } from 'react'
import axios from '../../api/axios'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import { withModalWindowStore } from '../../stores/ModalWindowStore';
import ProductCreateForm from '../../components/Forms/ProductCreateForm';
import { withAuthStore } from '../../stores/AuthStore';
import ProductEditForm from '../../components/Forms/ProductEditForm';
import { withAlertMessagesStore } from '../../stores/AlertMessagesStore';

class Products extends Component {
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

    add = () => {
        this.state.modalWindowStore.show("Create product", <ProductCreateForm />)
    }
    edit = (id) => {
        axios.get(`/products/${id}`, {
            headers: {
                Authorization: 'Bearer ' + this.state.authStore.token
            }
        })
            .then(res => {
                const productToEdit = res.data;
                this.state.modalWindowStore.show("Edit product", <ProductEditForm productId={id} productToEdit={productToEdit} onEditSuccess={this.getProucts} />)
            })
            .catch(err => {
                console.log(err)
                const errorMessage = err.response?.data?.message || 'Failed to fetch product data!';
                this.state.alertMessagesStore.addMessage(errorMessage, "danger");
            });
    }
    delete = (id) => {
        axios.delete(`/products/${id}`, {
            headers: {
                Authorization: 'Bearer ' + this.state.authStore.token
            }
        })
            .then(res => {
                const successMessage = res.data?.message || 'Successful!';
                this.state.alertMessagesStore.addMessage(successMessage, "success");
                this.getProucts();
            })
            .catch(err => {
                console.log(err)
                const errorMessage = err.response?.data?.message || 'Failed to delete product!';
                this.state.alertMessagesStore.addMessage(errorMessage, "danger");
            });
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th style={{ width: '100px' }}><button className='btn btn-sm btn-success w-100' onClick={this.add}>New</button></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map(({ _id, image, name, description, price, category, stock }, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={image} alt='' style={{ height: '30px' }} /></td>
                            <td>{name}</td>
                            <td>{description}</td>
                            <td>{price}</td>
                            <td>{category}</td>
                            <td>{stock}</td>
                            <td>
                                <Stack direction='horizontal' gap={2}>
                                    <button className='btn btn-sm btn-primary w-100' onClick={() => this.edit(_id)}>Edit</button>
                                    <button className='btn btn-sm btn-danger w-100' onClick={() => this.delete(_id)}>Delete</button>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default withAuthStore(withAlertMessagesStore(withModalWindowStore(Products)))