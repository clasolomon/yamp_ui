import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';
import { Alert, Button, Row, Col } from 'react-bootstrap';

class MeetingDatesAndTimes extends Component {
    constructor(props){
        super(props);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.getDatesAndTimes= this.getDatesAndTimes.bind(this);
    }

    handleChangeStartDate(index, dateObject){
        this.props.changeDateAndTime(index, dateObject.getTime(), null);
    }

    handleChangeEndDate(index, dateObject){
        this.props.changeDateAndTime(index, null, dateObject.getTime());
    }

    getDatesAndTimes(){
        let datesAndTimes = this.props.datesAndTimes.map((dateObject)=>{
            if(dateObject.startDate){
                let sDate = new Date();
                sDate.setTime(dateObject.startDate);
                dateObject.startDate = sDate;
            }
            if(dateObject.endDate){
                let eDate = new Date();
                eDate.setTime(dateObject.endDate);
                dateObject.endDate = eDate;
            }
            return dateObject;
        });
        return datesAndTimes;
    }

    render(){
        return(
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h4>Choose possible dates and times for your meeting:</h4>
                    { this.props.showStartTimeGreaterOrEqualThanEndTimeErrorMessage && <StartTimeGreaterOrEqualThanEndTimeErrorMessage/> }
                    { this.props.showAtLeastOneDateAndTimeErrorMessage && <AtLeastOneDateAndTimeErrorMessage/>}
                    {
                        this.getDatesAndTimes().map((dateObject, index) => {
                            return (<Row key={"r" + index}>
                                <Col xs={5} sm={5} md={5} lg={5} key={"c1" + index}>
                                    <DateTimePicker 
                                        key={"date" + index} 
                                        className="mdt-dateTimePicker"
                                        placeholder="Start date and time"
                                        min={new Date()}
                                        value={dateObject.startDate} 
                                        onChange={this.handleChangeStartDate.bind(null, index)}
                                    /> 
                                </Col>     
                                <Col xs={5} sm={5} md={5} lg={5} key={"c2" + index}>
                                    <DateTimePicker 
                                        key={"start" + index} 
                                        className="mdt-dateTimePicker"
                                        placeholder="End date and time"
                                        min={new Date()}
                                        value={dateObject.endDate} 
                                        onChange={this.handleChangeEndDate.bind(null, index)}
                                    />
                                </Col>     
                                <Col xs={1} sm={1} md={1} lg={1} key={"c3" + index}>
                                    <Button 
                                        key={"b" + index} 
                                        bsStyle="primary" 
                                        bsSize="small" 
                                        disabled={this.props.datesAndTimes.length > 1 ? false : true}
                                        onClick={this.props.deleteDateAndTime.bind(null, index)}
                                    >Delete</Button> 
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} key={"c4" + index}>
                                    {index===this.props.datesAndTimes.length-1 ? <Button 
                                        bsStyle="primary" 
                                        bsSize="small" 
                                        onClick={this.props.addDateAndTime}
                                    >Add</Button>:null} 
                                </Col>
                            </Row>);
                        })
                        }
                    </Col>
                </Row>
        )}
}

function AtLeastOneDateAndTimeErrorMessage(props){
    return <Alert bsStyle="danger">Please submit at least one starting and ending date and time for your meeting.</Alert>;
}

function StartTimeGreaterOrEqualThanEndTimeErrorMessage(props){
    return <Alert bsStyle="danger">Starting date and time must be earlier than ending date and time.</Alert>;
}

module.exports = MeetingDatesAndTimes;
