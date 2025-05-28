import React, { Component } from 'react'
import axios from '../../api/axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';
import { withAlertMessagesStore } from '../../stores/AlertMessagesStore';
import { withAuthStore } from '../../stores/AuthStore';

class ProductEditForm extends Component {
    handleCancel = () => {
        this.props.onClose();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const config = {
            headers: {
                Authorization: `Bearer ${this.state.authStore.token}`
            }
        };

        const productData = {
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            category: data.get("category"),
            stock: data.get("stock"),
            image: data.get("image"),
        };

        axios.patch(`/products/${this.props.productId}`, productData, config)
            .then(res => {
                const successMessage = res.data?.message || 'Successful!';
                this.state.alertMessagesStore.addMessage(successMessage, "success");
                this.props.onEditSuccess();
                this.props.onClose();
            })
            .catch(err => {
                const errorMessage = err.response?.data?.message || 'Failed!';
                this.state.alertMessagesStore.addMessage(errorMessage, "danger");
            });
    }

    render() {
        const { productToEdit = {} } = this.props;

        return (
            <div className='d-flex justify-content-center'>
                <div style={{ width: "450px" }}>
                    <Form className='mt-3' onSubmit={this.handleSubmit}>
                        <Stack gap={3}>
                            <FloatingLabel label="Name">
                                <Form.Control name="name" type="text" placeholder="Name" defaultValue={productToEdit.name} />
                            </FloatingLabel>
                            <FloatingLabel label="Description">
                                <Form.Control name="description" as="textarea" rows={3} placeholder="Description" defaultValue={productToEdit.description} />
                            </FloatingLabel>
                            <FloatingLabel label="Price">
                                <Form.Control name="price" type="number" placeholder="Price" defaultValue={productToEdit.price} />
                            </FloatingLabel>
                            <FloatingLabel label="Category">
                                <Form.Control name="category" type="text" placeholder="Category" defaultValue={productToEdit.category} />
                            </FloatingLabel>
                            <FloatingLabel label="Stock">
                                <Form.Control name="stock" type="number" placeholder="Stock" defaultValue={productToEdit.stock} />
                            </FloatingLabel>
                            <FloatingLabel label="Image">
                                <Form.Control name="image" type="text" placeholder="Image" defaultValue={productToEdit.image} />
                            </FloatingLabel>
                            <Button type='submit' variant='success' className='w-100'>Confirm</Button>
                            <Button variant='secondary' className='w-100' onClick={this.handleCancel}>Cancel</Button>
                        </Stack>
                    </Form>
                </div>
            </div>

        )
    }
}

export default withAuthStore(withAlertMessagesStore(ProductEditForm))