import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
}

class IAMUserCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    handleChange(event){
        this.setState({username: event.target.value})
    }

    handleCreate(){
        this.props.createIAMUser(this.state.username);
    }

    render () {
        const classes = this.props.classes;

        return (
            <PaperBody>
                <PaperTitle>IAM User: Create</PaperTitle>
                <form className={classes.container} noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="username"
                                label="username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange}
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={this.handleCreate}>Create</Button>
                        </Grid>
                    </Grid>
                </form>
            </PaperBody>
        )
    }
}

IAMUserCreate.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(connect(
    state => {
        let props = {};

        return props;
    },
    (dispatch, props) => ({
        createIAMUser: username => dispatch(createIAMUser(username, props)),
    })
)(withStyles(styles)(IAMUserCreate)));