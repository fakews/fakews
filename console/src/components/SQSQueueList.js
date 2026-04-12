import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import {connect} from 'react-redux';
import {getSQSQueueList} from '../actions/sqs';

class SQSQueueList extends Component {
    componentDidMount() {
        this.props.getSQSQueueList();
    }

    renderItem (item) {
        return (
            <ListItem key={`sqs-queue-${item.Name}`}>
                <ListItemIcon>
                    <FormatListNumberedIcon />
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

        if(typeof(state.sqs.list) !== 'undefined'){
            props.list = state.sqs.list;
        }

        return props;
    },
    dispatch => ({
        getSQSQueueList: () => dispatch(getSQSQueueList()),
    })
)(SQSQueueList);