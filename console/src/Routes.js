import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import IAM_Home from './pages/IAM_Home';
import IAM_CreateUser from './pages/IAM_CreateUser';
import S3 from './pages/S3';
import SQS from './pages/SQS';
import SNS from './pages/SNS';
import DynamoDB from './pages/DynamoDB';

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/iam" component={ IAM_Home } />
                <Route exact path="/iam/create" component={ IAM_CreateUser } />
                <Route exact path="/s3" component={ S3 } />
                <Route exact path="/sqs" component={ SQS } />
                <Route exact path="/sns" component={ SNS } />
                <Route exact path="/dynamodb" component={ DynamoDB } />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)