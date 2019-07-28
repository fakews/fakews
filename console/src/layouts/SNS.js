import React from 'react';
import withDashboard from './Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import SNSTopicList from '../components/SNSTopicList';
import SNSSubscriptionList from '../components/SNSSubscriptionList';

const SNS = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>SNS Topic List</PaperTitle>
            <SNSTopicList />
        </PaperBody>

        <PaperBody>
            <PaperTitle>SNS Subscription List</PaperTitle>
            <SNSSubscriptionList />
        </PaperBody>
    </Grid>
)

export default withDashboard(SNS);
