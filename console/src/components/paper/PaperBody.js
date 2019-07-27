import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

export default function PaperBody(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            {props.children}
        </Paper>
    );
}

PaperBody.propTypes = {
    children: PropTypes.node,
};