import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';
import { connect } from 'react-redux';
import { getCloudWatchMetricList } from '../actions/cloudwatch';

class CloudWatchMetricList extends Component {
    componentDidMount() {
        this.props.getCloudWatchMetricList();
    }

    renderItem(item) {
        return (
            <ListItem key={`cw-metric-${item.Namespace}-${item.MetricName}`}>
                <ListItemIcon><TimelineIcon /></ListItemIcon>
                <ListItemText primary={item.MetricName} secondary={`Namespace: ${item.Namespace}`} />
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
    state => ({ list: (state.cloudwatch && state.cloudwatch.metrics && state.cloudwatch.metrics.list) || [] }),
    dispatch => ({ getCloudWatchMetricList: () => dispatch(getCloudWatchMetricList()) })
)(CloudWatchMetricList);
