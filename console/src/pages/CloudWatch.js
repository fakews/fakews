import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import CloudWatchMetricList from '../components/CloudWatchMetricList';
import LogGroupList from '../components/LogGroupList';

const CloudWatch = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>CloudWatch Metrics</PaperTitle>
            <CloudWatchMetricList />
        </PaperBody>

        <PaperBody>
            <PaperTitle>CloudWatch Log Groups</PaperTitle>
            <LogGroupList />
        </PaperBody>
    </Grid>
);

export default withDashboard(CloudWatch);
