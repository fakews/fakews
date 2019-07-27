import React from 'react';
import withLayout from '../layouts/Dashboard';

import Typography from '@material-ui/core/Typography';

const RecentActivity = (
    <Dashboard>
        <Paper className={fixedHeightPaper}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Recent Activity</Typography>
        </Paper>
    </Dashboard>
);

export default RecentActivity;