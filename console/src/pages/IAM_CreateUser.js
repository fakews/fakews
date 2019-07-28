import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import IAMUserCreate from '../components/IAMUserCreate';

const IAM_Home = () => (
    <Grid item xs={12}>
        <IAMUserCreate />
    </Grid>
)

export default withDashboard(IAM_Home);
