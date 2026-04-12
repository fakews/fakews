import { combineReducers } from 'redux';

import iam from './iam';
import s3 from './s3';
import sqs from './sqs';
import sns from './sns';
import dynamodb from './dynamodb';
import cognito from './cognito';
import ssm from './ssm';
import cloudwatch from './cloudwatch';

export default combineReducers({
    iam,
    s3,
    sqs,
    sns,
    dynamodb,
    cognito,
    ssm,
    cloudwatch,
});
