import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import {connect} from 'react-redux';
import {getSQSQueueList} from '../actions/sqs';

class SQSQueueList extends Component {
    constructor(props) {
        super(props);

        this.props.getSQSQueueList();
    }

    renderBucketItem (item) {
        return (
            <ListItem key={"bucket"-item.Name}>
                <ListItemIcon>
                    <FormatListNumberedIcon />
                </ListItemIcon>
                <ListItemText primary={item.Name} secondary={item.Url} />
            </ListItem>
        )
    }

    render () {
        return (
            <List>
                { this.props.list.map(v => this.renderBucketItem(v)) }
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