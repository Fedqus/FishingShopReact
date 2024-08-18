import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import AlertMessage from './AlertMessage';
import { withAlertMessagesStore } from '../stores/AlertMessagesStore';

class AlertMessageContainer extends Component {
    render() {
        return (
            <Stack className='position-absolute end-0 z-1 m-3' style={{ top: "56px" }}>
                {this.state.alertMessagesStore.messages.map(({ id, message, variant }) => (
                    <AlertMessage
                        key={id}
                        message={message}
                        variant={variant}
                        onRemove={() => this.state.alertMessagesStore.removeMessage(id)}
                    />
                ))}
            </Stack>
        );
    }
}

export default withAlertMessagesStore(AlertMessageContainer);

