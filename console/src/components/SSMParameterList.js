import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import { getSSMParameterList } from '../actions/ssm';

class SSMParameterList extends Component {
    componentDidMount() {
        this.props.getSSMParameterList();
    }

    renderItem(item) {
        return (
            <ListItem key={`ssm-param-${item.Name}`}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary={item.Name} secondary={`Type: ${item.Type}`} />
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
    state => ({ list: (state.ssm && state.ssm.list) || [] }),
    dispatch => ({ getSSMParameterList: () => dispatch(getSSMParameterList()) })
)(SSMParameterList);
