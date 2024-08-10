import React, { Component } from 'react';

import Stack from 'react-bootstrap/Stack';
import AlertMessage from './AlertMessage';

class AlertMessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            nextId: 1
        }

        this.createComponent = this.createMessage.bind(this);
        this.removeComponent = this.removeMessage.bind(this);
    }

    createMessage(message, variant) {
        this.setState({
            components: [...this.state.components, { id: this.state.nextId, message, variant }],
            nextId: this.state.nextId + 1
        });
    }

    removeMessage(id) {
        this.setState({
            components: this.state.components.filter(component => component.id !== id)
        });
    }

    render() {
        return (
            <Stack className='position-absolute end-0 z-1 m-3' style={{ top: "56px" }}>
                {this.state.components.map(({ id, message, variant }) => (
                    <AlertMessage key={id} message={message} variant={variant} onRemove={() => this.removeMessage(id)} />
                ))}
            </Stack>
        )
    }
}

export default AlertMessageContainer;