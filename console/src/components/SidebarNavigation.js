import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LayersIcon from '@material-ui/icons/Layers';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import { getNotificationList } from '../actions/notifications';
import { getDynamoDBList } from '../actions/dynamodb';
import { getIAMUserList } from '../actions/iam';
import { getS3BucketList } from '../actions/s3';
import { getSQSQueueList } from '../actions/sqs';
import { getSNSTopicList } from '../actions/sns';

const StyledBadge = withStyles(theme => ({
    badge: {
        top: '50%',
        right: '-2em',
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`,
    },
}))(Badge);

class SidebarNavigation extends Component {
    constructor(props)
    {
        super(props);

        this.props.getNotificationList();
        this.props.getDynamoDBList();
        this.props.getIAMUserList();
        this.props.getS3BucketList();
        this.props.getSNSTopicList();
        this.props.getSQSQueueList();
    }

    render() {
        return (
            <List>
                <nav>
                    <ListItem button component={Link} to="/">
                        <StyledBadge color="secondary" badgeContent={this.props.notifications}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/iam">
                        <StyledBadge color="secondary" badgeContent={this.props.iam}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="IAM" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/s3">
                        <StyledBadge color="secondary" badgeContent={this.props.s3}>
                            <ListItemIcon>
                                <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText primary="S3" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/sqs">
                        <StyledBadge color="secondary" badgeContent={this.props.sqs}>
                            <ListItemIcon>
                                <FormatListNumberedIcon />
                            </ListItemIcon>
                            <ListItemText primary="SQS" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/sns">
                        <StyledBadge color="secondary" badgeContent={this.props.sns}>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText primary="SNS" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/dynamodb">
                        <StyledBadge color="secondary" badgeContent={this.props.dynamodb}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="DynamoDB" />
                        </StyledBadge>
                    </ListItem>
                </nav>
            </List>
        )
    }
}

export default connect(
    state => {
        let props = {
            notifications: 0,
            iam: 0,
            s3: 0,
            sqs: 0,
            sns: 0,
            dynamodb: 0,
        };

        if(typeof(state.notifications) !== 'undefined'){
            props.notifications = state.notifications.count;
        }

        if(typeof(state.iam) !== 'undefined'){
            props.iam = state.iam.count;
        }

        if(typeof(state.s3) !== 'undefined'){
            props.s3 = state.s3.count;
        }

        if(typeof(state.sqs) !== 'undefined'){
            props.sqs = state.sqs.count;
        }

        if(typeof(state.sns.topics) !== 'undefined'){
            props.sns = state.sns.topics.count;
        }

        if(typeof(state.dynamodb) !== 'undefined'){
            props.dynamodb = state.dynamodb.count;
        }

        return props;
    },
    dispatch => ({
        getNotificationList: () => dispatch(getNotificationList()),
        getIAMUserList: () => dispatch(getIAMUserList()),
        getS3BucketList: () => dispatch(getS3BucketList()),
        getSQSQueueList: () => dispatch(getSQSQueueList()),
        getSNSTopicList: () => dispatch(getSNSTopicList()),
        getDynamoDBList: () => dispatch(getDynamoDBList()),
    })
)(SidebarNavigation);
