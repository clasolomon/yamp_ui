import React, {Component} from 'react';
import { Modal, Button } from 'react-bootstrap';

class ErrorView extends Component {
    constructor(props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick(){
        this.props.history.replace({pathname: '/', state: {errorOccured: false}});
    }

    render(){
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        An unexpected error occurred.
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
