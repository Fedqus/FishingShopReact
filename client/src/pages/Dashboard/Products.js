import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

class Products extends Component {
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
                        <th style={{width: '100px'}}><Badge bg="success" className='w-100'>New</Badge></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Vlad Savchuk</td>
                        <td>vladsavchuk@gmail.com</td>
                        <td>0967346181</td>
                        <td>ADMIN</td>
                        <td>
                            <Stack direction='horizontal' gap={2}>
                                <Badge bg="primary" className='w-100'>Edit</Badge>
                                <Badge bg="danger" className='w-100'>Delete</Badge>
                            </Stack>
                        </td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default Products