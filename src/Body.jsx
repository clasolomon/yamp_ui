import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MeetingSetup from './MeetingSetup';

class Body extends Component {
    render() {
        return (
                <Grid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <MeetingSetup/>
                        </Col>
                    </Row>
                </Grid>
        );
    }
}

export default Body;
