import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from './axios-instance';

class ErrorView extends Component {
    constructor(props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick(){
        this.props.history.replace('/');
    }

    render(){
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        An unexpected error occured.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleCloseClick}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        );
    }
}

export default ErrorView;
