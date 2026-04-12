import React from 'react';
import { Route, HashRouter, Routes } from 'react-router-dom';

import Home from './pages/Home';
import IAM_Home from './pages/IAM_Home';
import IAM_CreateUser from './pages/IAM_CreateUser';
import S3 from './pages/S3';
import SQS from './pages/SQS';
import SNS from './pages/SNS';
import DynamoDB from './pages/DynamoDB';
import Cognito from './pages/Cognito';
import SSM from './pages/SSM';
import CloudWatch from './pages/CloudWatch';

const AppRoutes = () => (
    <HashRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/iam" element={<IAM_Home />} />
            <Route exact path="/iam/create" element={<IAM_CreateUser />} />
            <Route exact path="/s3" element={<S3 />} />
            <Route exact path="/sqs" element={<SQS />} />
            <Route exact path="/sns" element={<SNS />} />
            <Route exact path="/dynamodb" element={<DynamoDB />} />
            <Route exact path="/cognito" element={<Cognito />} />
            <Route exact path="/ssm" element={<SSM />} />
            <Route exact path="/cloudwatch" element={<CloudWatch />} />
        </Routes>
    </HashRouter>
);

export default AppRoutes;
