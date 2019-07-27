import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';

import {connect} from 'react-redux';
import {getDynamoDBList} from '../actions/dynamodb';

class DynamoDBList extends Component {
    constructor(props) {
        super(props);

        this.props.getDynamoDBList();
    }

    renderItem (item) {
        return (
            <ListItem key={`dynamodb-item-${item}`}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
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

        if(typeof(state.dynamodb.list) !== 'undefined'){
            props.list = state.dynamodb.list;
        }

        return props;
    },
    dispatch => ({
        getDynamoDBList: () => dispatch(getDynamoDBList()),
    })
)(DynamoDBList);