import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import CognitoPoolList from '../components/CognitoPoolList';

const Cognito = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>Cognito User Pools</PaperTitle>
            <CognitoPoolList />
        </PaperBody>
    </Grid>
);

export default withDashboard(Cognito);
