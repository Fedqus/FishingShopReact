import React, { Component } from 'react';

class Forbidden extends Component {
    render() {
        return (
            <div className='text-center'>
                <h1>403 - Access Forbidden</h1>
                <p>You do not have permission to access this page.</p>
            </div>
        )
    }
}

export default Forbidden;