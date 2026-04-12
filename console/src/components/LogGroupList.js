import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { connect } from 'react-redux';
import { getLogGroupList } from '../actions/cloudwatch';

class LogGroupList extends Component {
    componentDidMount() {
        this.props.getLogGroupList();
    }

    renderItem(item) {
        return (
            <ListItem key={`log-group-${item.logGroupName}`}>
                <ListItemIcon><DescriptionIcon /></ListItemIcon>
                <ListItemText primary={item.logGroupName} secondary={`Stored bytes: ${item.storedBytes || 0}`} />
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
            <List>
                {this.props.list.map(v => this.renderItem(v))}
                {this.renderEmpty(this.props.list)}
            </List>
        );
    }
}

export default connect(
    state => ({ list: (state.cloudwatch && state.cloudwatch.logGroups && state.cloudwatch.logGroups.list) || [] }),
    dispatch => ({ getLogGroupList: () => dispatch(getLogGroupList()) })
)(LogGroupList);
