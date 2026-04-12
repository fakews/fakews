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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';

import { getDynamoDBList } from '../actions/dynamodb';
import { getIAMUserList } from '../actions/iam';
import { getS3BucketList } from '../actions/s3';
import { getSQSQueueList } from '../actions/sqs';
import { getSNSTopicList } from '../actions/sns';
import { getCognitoUserPoolList } from '../actions/cognito';
import { getSSMParameterList } from '../actions/ssm';

const StyledBadge = withStyles(theme => ({
    badge: {
        top: '50%',
        right: '-2em',
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
        }`,
    },
}))(Badge);

class SidebarNavigation extends Component {
    componentDidMount() {
        this.props.getDynamoDBList();
        this.props.getIAMUserList();
        this.props.getS3BucketList();
        this.props.getSNSTopicList();
        this.props.getSQSQueueList();
        this.props.getCognitoUserPoolList();
        this.props.getSSMParameterList();
    }

    render() {
        return (
            <List>
                <nav>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
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

                    <ListItem button component={Link} to="/cognito">
                        <StyledBadge color="secondary" badgeContent={this.props.cognito}>
                            <ListItemIcon>
                                <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cognito" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/ssm">
                        <StyledBadge color="secondary" badgeContent={this.props.ssm}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="SSM" />
                        </StyledBadge>
                    </ListItem>

                    <ListItem button component={Link} to="/cloudwatch">
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary="CloudWatch" />
                    </ListItem>
                </nav>
            </List>
        );
    }
}

export default connect(
    state => ({
        iam: (state.iam && state.iam.count) || 0,
        s3: (state.s3 && state.s3.count) || 0,
        sqs: (state.sqs && state.sqs.count) || 0,
        sns: (state.sns && state.sns.topics && state.sns.topics.count) || 0,
        dynamodb: (state.dynamodb && state.dynamodb.count) || 0,
        cognito: (state.cognito && state.cognito.count) || 0,
        ssm: (state.ssm && state.ssm.count) || 0,
    }),
    dispatch => ({
        getIAMUserList: () => dispatch(getIAMUserList()),
        getS3BucketList: () => dispatch(getS3BucketList()),
        getSQSQueueList: () => dispatch(getSQSQueueList()),
        getSNSTopicList: () => dispatch(getSNSTopicList()),
        getDynamoDBList: () => dispatch(getDynamoDBList()),
        getCognitoUserPoolList: () => dispatch(getCognitoUserPoolList()),
        getSSMParameterList: () => dispatch(getSSMParameterList()),
    })
)(SidebarNavigation);
