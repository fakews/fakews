import React from 'react';
import withDashboard from './Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import IAMUserList from '../components/IAMUserList';

const IAM = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>IAM User List</PaperTitle>
            <IAMUserList />
        </PaperBody>
    </Grid>
)

export default withDashboard(IAM);
