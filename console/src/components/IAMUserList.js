import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

import {connect} from 'react-redux';
import {getIAMUserList} from '../actions/iam';

class IAMUserList extends Component {
    constructor(props) {
        super(props);

        this.props.getIAMUserList();
    }

    renderItem (item) {
        return (
            <ListItem key={`iam-${item.Name}`}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={item.UserName} secondary={`UserId: ${item.UserId}`}/>
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

        if(typeof(state.iam.list) !== 'undefined'){
            props.list = state.iam.list;
        }

        return props;
    },
    dispatch => ({
        getIAMUserList: () => dispatch(getIAMUserList()),
    })
)(IAMUserList);