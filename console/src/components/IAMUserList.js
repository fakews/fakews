import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CancelIcon from '@material-ui/icons/Cancel';

import {connect} from 'react-redux';
import {getIAMUserList} from '../actions/iam';
import PaperBody from './paper/PaperBody';
import PaperTitle from './paper/PaperTitle';
import {Link} from "react-router-dom";

class IAMUserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteUsername: false,
        }

        this.props.getIAMUserList();

        this.requestDelete = this.requestDelete.bind(this);
        this.executeDelete = this.executeDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
    }

    requestDelete (username) {
        this.setState({
            deleteUsername: username
        });
    }

    executeDelete () {

    }

    cancelDelete () {
        this.setState({
            deleteUsername: false,
        })
    }

    renderRequestDelete () {
        return (
            <React.Fragment>
                <Button variant="contained" color="secondary" onClick={this.executeDelete} marginRight={1}>
                    Confirm Delete?
                    <SentimentVeryDissatisfiedIcon />
                </Button>

                <Button variant="contained" onClick={this.cancelDelete}>
                    Cancel <CancelIcon />
                </Button>
            </React.Fragment>
        );
    }

    renderControls (item) {
        if(item.UserName === this.state.deleteUsername){
            return this.renderRequestDelete(this.state.deleteUsername);
        }

        return (
            <React.Fragment>
                <Button variant="contained" color="primary" component={Link} to={`/iam/edit/${item.UserName}`} marginRight={1}>
                    Edit
                    <EditIcon />
                </Button>

                <Button variant="contained" color="secondary" onClick={() => this.requestDelete(item.UserName)}>
                    Delete
                    <DeleteIcon />
                </Button>
            </React.Fragment>
        )
    }

    renderItem (item) {
        return (
            <ListItem key={`iam-${item.UserName}`}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={item.UserName} secondary={`UserId: ${item.UserId}`}/>

                {this.renderControls(item)}
            </ListItem>
        )
    }

    renderEmpty (list) {
        if(list.length > 0) return;

        return (
            <ListItem key={'empty-list'}>
                <ListItemText primary="There are no entries in the list" />
            </ListItem>
        )
    }

    render () {
        return (
            <PaperBody>
                <PaperTitle>IAM User List</PaperTitle>
                <List>
                    { this.props.list.map(v => this.renderItem(v)) }
                    { this.renderEmpty(this.props.list) }
                </List>
            </PaperBody>
        )
    }
}

export default connect(
    state => {
        let props = {list: []};

        if(typeof(state.iam.list) !== 'undefined'){
            props.list = state.iam.list;
        }

        return props;
    },
    dispatch => ({
        getIAMUserList: () => dispatch(getIAMUserList()),
    })
)(IAMUserList);