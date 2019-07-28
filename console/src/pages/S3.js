import React from 'react';
import withDashboard from '../layouts/Dashboard';

import { Grid } from '@material-ui/core';
import PaperBody from '../components/paper/PaperBody';
import PaperTitle from '../components/paper/PaperTitle';

import S3BucketList from '../components/S3BucketList';

const S3 = () => (
    <Grid item xs={12}>
        <PaperBody>
            <PaperTitle>S3 Bucket List</PaperTitle>
            <S3BucketList />
        </PaperBody>
    </Grid>
)

export default withDashboard(S3);
