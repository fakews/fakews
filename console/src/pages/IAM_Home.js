import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import IAMUserList from '../components/IAMUserList';

const IAM_Home = () => (
    <Grid item xs={12}>
        <IAMUserList />
    </Grid>
)

export default withDashboard(IAM_Home);
