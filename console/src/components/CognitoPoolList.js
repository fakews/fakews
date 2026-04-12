import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { connect } from 'react-redux';
import { getCognitoUserPoolList } from '../actions/cognito';

class CognitoPoolList extends Component {
    componentDidMount() {
        this.props.getCognitoUserPoolList();
    }

    renderItem(item) {
        return (
            <ListItem key={`cognito-pool-${item.Id}`}>
                <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                <ListItemText primary={item.Name} secondary={`Id: ${item.Id}`} />
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
    state => ({ list: (state.cognito && state.cognito.list) || [] }),
    dispatch => ({ getCognitoUserPoolList: () => dispatch(getCognitoUserPoolList()) })
)(CognitoPoolList);
