import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {connect} from 'react-redux';
import {getSNSTopicList} from '../actions/sns';

class SNSTopicList extends Component {
    constructor(props) {
        super(props);

        this.props.getSNSTopicList();
    }

    renderItem (item) {
        return (
            <ListItem key={`sns-topic-${item.TopicArn}`}>
                <ListItemIcon>
                    <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary={item.TopicArn} secondary={item.TopicArn} />
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

        if(typeof(state.sns.topics.list) !== 'undefined'){
            props.list = state.sns.topics.list;
        }

        return props;
    },
    dispatch => ({
        getSNSTopicList: () => dispatch(getSNSTopicList()),
    })
)(SNSTopicList);