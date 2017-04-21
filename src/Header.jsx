import React, { Component } from 'react';
import { Button, PageHeader, Grid, Row, Col } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <PageHeader>
                <Grid>
                    <Row>
                        <Col xs={9} sm={9} md={9} lg={9}>
                            YAMP <small>yet another meeting planner</small>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <Button bsStyle="primary" className="headerLoginButton">Log in</Button>
                            <Button bsStyle="primary" className="headerRegisterButton">Register</Button>
                        </Col>
                    </Row>
                </Grid>
            </PageHeader>
        );
    }
}

export default Header;
