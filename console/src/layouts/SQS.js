import React from 'react';
import withDashboard from './Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import SQSQueueList from '../components/SQSQueueList';

const SQS = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>SQS Queue List</PaperTitle>
            <SQSQueueList />
        </PaperBody>
    </Grid>
)

export default withDashboard(SQS);