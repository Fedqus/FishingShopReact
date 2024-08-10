import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';

class AlertMessage extends Component {
    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.remove();
        }, 5000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    remove() {
        this.props.onRemove();
    }

    render() {
        return (
            <Alert variant={this.props.variant} className='d-flex justify-content-between align-items-center'>
                <div>{this.props.message}</div>
                <CloseButton className='ms-2' onClick={this.remove}/>
            </Alert>
        )
    }
}

export default AlertMessage;