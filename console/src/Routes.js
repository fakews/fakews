import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import Home from './layouts/Home';
import IAM from './layouts/IAM';
import S3 from './layouts/S3';
import SQS from './layouts/SQS';
import SNS from './layouts/SNS';
import DynamoDB from './layouts/DynamoDB';

export default props => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/iam" component={ IAM } />
                <Route exact path="/s3" component={ S3 } />
                <Route exact path="/sqs" component={ SQS } />
                <Route exact path="/sns" component={ SNS } />
                <Route exact path="/dynamodb" component={ DynamoDB } />
            </Switch>
        </ScrollToTop>
    </HashRouter>
)