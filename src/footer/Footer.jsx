import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <Grid className="footer">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <p>
                            Copyright &copy; 2017-present, Solomon Ioan Claudiu<br/>
                            <small>This is a simple web application created with the sole purpose of learning.</small>
                        </p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Footer;
