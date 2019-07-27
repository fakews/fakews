import React, {Component} from 'react';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SdStorageIcon from '@material-ui/icons/SdStorage';

import {connect} from 'react-redux';
import {getS3BucketList} from '../actions/s3';

class S3BucketList extends Component {
    constructor(props) {
        super(props);

        this.props.getS3BucketList();
    }

    renderItem (item) {
        return (
            <ListItem key={`s3-bucket-${item.Name}`}>
                <ListItemIcon>
                    <SdStorageIcon />
                </ListItemIcon>
                <ListItemText primary={item.Name} />
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

        if(typeof(state.s3.list) !== 'undefined'){
            props.list = state.s3.list;
        }

        console.log({ state, props });

        return props;
    },
    dispatch => ({
        getS3BucketList: () => dispatch(getS3BucketList()),
    })
)(S3BucketList);