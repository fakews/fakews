import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import SSMParameterList from '../components/SSMParameterList';

const SSM = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>SSM Parameters</PaperTitle>
            <SSMParameterList />
        </PaperBody>
    </Grid>
);

export default withDashboard(SSM);
