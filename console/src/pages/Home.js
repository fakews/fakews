import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withDashboard from '../layouts/Dashboard';

import { Grid, Typography, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import PeopleIcon from '@material-ui/icons/People';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LayersIcon from '@material-ui/icons/Layers';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';

const styles = theme => ({
    card: {
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
    icon: {
        fontSize: 48,
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
    },
    count: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

const ServiceCard = ({ classes, icon: Icon, title, count, to }) => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.card} component={Link} to={to}>
            <Icon className={classes.icon} />
            <div>
                <Typography className={classes.count}>{count}</Typography>
                <Typography variant="body2" color="textSecondary">{title}</Typography>
            </div>
        </Paper>
    </Grid>
);

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="h5" gutterBottom>Service Overview</Typography>
                <Grid container spacing={3}>
                    <ServiceCard classes={classes} icon={PeopleIcon} title="IAM Users" count={this.props.iam} to="/iam" />
                    <ServiceCard classes={classes} icon={FileCopyIcon} title="S3 Buckets" count={this.props.s3} to="/s3" />
                    <ServiceCard classes={classes} icon={FormatListNumberedIcon} title="SQS Queues" count={this.props.sqs} to="/sqs" />
                    <ServiceCard classes={classes} icon={NotificationsIcon} title="SNS Topics" count={this.props.sns} to="/sns" />
                    <ServiceCard classes={classes} icon={LayersIcon} title="DynamoDB Tables" count={this.props.dynamodb} to="/dynamodb" />
                    <ServiceCard classes={classes} icon={VpnKeyIcon} title="Cognito Pools" count={this.props.cognito} to="/cognito" />
                    <ServiceCard classes={classes} icon={SettingsIcon} title="SSM Parameters" count={this.props.ssm} to="/ssm" />
                    <ServiceCard classes={classes} icon={TimelineIcon} title="CloudWatch" count="-" to="/cloudwatch" />
                </Grid>
            </div>
        );
    }
}

const StyledHome = withStyles(styles)(connect(
    state => ({
        iam: (state.iam && state.iam.count) || 0,
        s3: (state.s3 && state.s3.count) || 0,
        sqs: (state.sqs && state.sqs.count) || 0,
        sns: (state.sns && state.sns.topics && state.sns.topics.count) || 0,
        dynamodb: (state.dynamodb && state.dynamodb.count) || 0,
        cognito: (state.cognito && state.cognito.count) || 0,
        ssm: (state.ssm && state.ssm.count) || 0,
    })
)(Home));

export default withDashboard(StyledHome);
