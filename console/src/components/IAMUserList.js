import React, { Component } from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import CancelIcon from '@material-ui/icons/Cancel';

import { connect } from 'react-redux';
import { getIAMUserList, deleteIAMUser } from '../actions/iam';
import PaperBody from './paper/PaperBody';
import PaperTitle from './paper/PaperTitle';

class IAMUserList extends Component {
    constructor(props) {
        super(props);
        this.state = { deleteUsername: false };
    }

    componentDidMount() {
        this.props.getIAMUserList();
    }

    requestDelete(username) {
        this.setState({ deleteUsername: username });
    }

    executeDelete() {
        if (this.state.deleteUsername) {
            this.props.deleteIAMUser(this.state.deleteUsername);
            this.setState({ deleteUsername: false });
        }
    }

    cancelDelete() {
        this.setState({ deleteUsername: false });
    }

    renderRequestDelete() {
        return (
            <React.Fragment>
                <Button variant="contained" color="secondary" onClick={() => this.executeDelete()} style={{ marginRight: 8 }}>
                    Confirm? <SentimentVeryDissatisfiedIcon />
                </Button>
                <Button variant="contained" onClick={() => this.cancelDelete()}>
                    Cancel <CancelIcon />
                </Button>
            </React.Fragment>
        );
    }

    renderControls(item) {
        if (item.UserName === this.state.deleteUsername) {
            return this.renderRequestDelete();
        }

        return (
            <Button variant="contained" color="secondary" onClick={() => this.requestDelete(item.UserName)} style={{ marginLeft: 16 }}>
                Delete <DeleteIcon />
            </Button>
        );
    }

    renderItem(item) {
        return (
            <ListItem key={`iam-${item.UserName}`}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={item.UserName} secondary={`UserId: ${item.UserId}`} />
                {this.renderControls(item)}
            </ListItem>
        );
    }

    renderEmpty(list) {
        if (list.length > 0) return null;
        return (
            <ListItem key="empty-list">
                <ListItemText primary="There are no entries in the list" />
            </ListItem>
        );
    }

    render() {
        return (
            <PaperBody>
                <PaperTitle createLink="/iam/create" createLabel="Create User">IAM User List</PaperTitle>
                <List>
                    {this.props.list.map(v => this.renderItem(v))}
                    {this.renderEmpty(this.props.list)}
                </List>
            </PaperBody>
        );
    }
}

export default connect(
    state => ({
        list: (state.iam && state.iam.list) || [],
    }),
    dispatch => ({
        getIAMUserList: () => dispatch(getIAMUserList()),
        deleteIAMUser: username => dispatch(deleteIAMUser(username)),
    })
)(IAMUserList);
