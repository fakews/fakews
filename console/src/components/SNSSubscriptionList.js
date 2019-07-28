import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {connect} from 'react-redux';
import {getSNSSubscriptionList} from '../actions/sns';

class SNSSubscriptionList extends Component {
    constructor(props) {
        super(props);

        this.props.getSNSSubscriptionList();
    }

    renderItem (item) {
        return (
            <ListItem key={`sns-subscription-${item.Name}`}>
                <ListItemIcon>
                    <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary={item.Name} secondary={item.Url} />
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
            <List>
                { this.props.list.map(v => this.renderItem(v)) }
                { this.renderEmpty(this.props.list) }
            </List>
        )
    }
}

export default connect(
    state => {
        let props = {list: []};

        if(typeof(state.sns.subscriptions) !== 'undefined'){
            props.list = state.sns.subscriptions.list;
        }

        return props;
    },
    dispatch => ({
        getSNSSubscriptionList: () => dispatch(getSNSSubscriptionList()),
    })
)(SNSSubscriptionList);