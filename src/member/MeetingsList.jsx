import React, { Component } from 'react';
import { Pager, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MeetingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            numberOfPages: 1        
        };
        this.showItem = this.showItem.bind(this);
        this.previousPage = this.previousPage.bind(this);  
        this.nextPage = this.nextPage.bind(this);  
    }

    componentWillReceiveProps(nextProps){
        this.setState(
            {
                numberOfPages: Math.ceil(nextProps.meetings.length / MeetingsList.ITEMS_PER_PAGE)
            }
        ); 
    }

    static get ITEMS_PER_PAGE() {
        return 3;
    }

    showItem(index){
        if( index >= (this.state.page-1) * MeetingsList.ITEMS_PER_PAGE 
            && index < this.state.page * MeetingsList.ITEMS_PER_PAGE ){
            return true;
        }
        return false;
    }

    previousPage(){
        if(this.state.page > 1){
            this.setState(
                {
                    page: this.state.page - 1
                }
            );
        }
    }

    nextPage(){
        if(this.state.page < this.state.numberOfPages){
            this.setState(
                {
                    page: this.state.page + 1
                }
            );
        }
    }

    renderMeetings(){
        return this.props.meetings.map(
            (meeting, index)=>{
                if(this.showItem(index)){
                    return (
                        <ListGroupItem 
                            key={"lgi" + index} 
                            className="listGroupItem" 
                            name={index} 
                            onClick={this.props.handleMeetingListItemClick}
                        >
                            {meeting.meeting_name}
                        </ListGroupItem>
                    );
                }
                return null;
            }
        );
    }

    render(){
        return (
            <ListGroup className="listGroup">
                <ListGroupItem active className="listGroupHeader">Meetings</ListGroupItem>
                { this.renderMeetings() } 
                <ListGroupItem active className="listGroupItemPagination">
                    <Pager className="pager">
                        <Pager.Item onClick={this.previousPage}>{"<<"}</Pager.Item>
                        {' ' + this.state.page + ' of ' + this.state.numberOfPages + ' '}
                        <Pager.Item onClick={this.nextPage}>{">>"}</Pager.Item>
                    </Pager>
                </ListGroupItem>
                <ListGroupItem 
                    active 
                    className="listGroupItemPlanMeeting" 
                    onClick={this.props.handlePlanMeetingClick}
                >
                    Plan new meeting
                </ListGroupItem>
            </ListGroup>
        );
    }
}

MeetingsList.propTypes = {
    meetings: PropTypes.array,
    handlePlanMeetingClick: PropTypes.func,
    handleMeetingListItemClick: PropTypes.func
}

export default MeetingsList;
