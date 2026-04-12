import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import PaperBody from './paper/PaperBody';
import PaperTitle from './paper/PaperTitle';
import { createIAMUser } from '../actions/iam';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginRight: '1rem',
        width: 200,
    },
};

class IAMUserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', submitted: false };
    }

    handleChange(event) {
        this.setState({ username: event.target.value, submitted: false });
    }

    handleCreate() {
        if (this.state.username.trim()) {
            this.props.createIAMUser(this.state.username.trim());
            this.setState({ username: '', submitted: true });
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <PaperBody>
                <PaperTitle>IAM User: Create</PaperTitle>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); this.handleCreate(); }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="username"
                                label="Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={e => this.handleChange(e)}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={() => this.handleCreate()}>
                                Create
                            </Button>
                            {this.state.submitted && (
                                <span style={{ marginLeft: 16, color: 'green' }}>User created successfully</span>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </PaperBody>
        );
    }
}

export default connect(
    () => ({}),
    dispatch => ({
        createIAMUser: username => dispatch(createIAMUser(username)),
    })
)(withStyles(styles)(IAMUserCreate));
