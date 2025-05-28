// import React, { Component } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import { withModalWindowStore } from '../stores/ModalWindowStore';

// class ModalWindow extends Component {
//     render() {
//         return (
//             <Modal
//                 show={this.state.modalWindowStore.visible}
//                 onHide={this.state.modalWindowStore.hide}
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>
//                         {this.state.modalWindowStore.title}
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {this.state.modalWindowStore.body}
//                 </Modal.Body>
//             </Modal>
//         );
//     }
// }

// export default withModalWindowStore(ModalWindow);

import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { withModalWindowStore } from '../stores/ModalWindowStore';

class ModalWindow extends Component {
    render() {
        const { visible, title, body, hide } = this.state.modalWindowStore;

        let content;

        if (React.isValidElement(body)) {
            content = React.cloneElement(body, { onClose: hide });
        } else {
            content = body;
        }

        return (
            <Modal
                show={visible}
                onHide={hide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {content}
                </Modal.Body>
            </Modal>
        );
    }
}

export default withModalWindowStore(ModalWindow);