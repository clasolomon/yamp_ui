import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Footer extends Component {
    render() {
        return (
                <Grid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <p>Copyright &copy; 2017-present, Solomon Ioan Claudiu</p>
                        </Col>
                    </Row>
                </Grid>
        );
    }
}

export default Footer;
