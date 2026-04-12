import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function PaperTitle(props) {
    return (
        <Grid container direction="row" justifyContent="space-between">
            <Grid item>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    {props.children}
                </Typography>
            </Grid>
            {props.createLink && (
                <Grid item>
                    <Button variant="contained" color="primary" component={Link} to={props.createLink}>
                        {props.createLabel || 'Create'}
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

PaperTitle.propTypes = {
    children: PropTypes.node,
    createLink: PropTypes.string,
    createLabel: PropTypes.string,
};
