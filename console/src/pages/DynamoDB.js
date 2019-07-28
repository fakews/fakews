import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import DynamoDBList from '../components/DynamoDBList';

const DynamoDB = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>DynamoDB List</PaperTitle>
            <DynamoDBList />
        </PaperBody>
    </Grid>
)

export default withDashboard(DynamoDB);
