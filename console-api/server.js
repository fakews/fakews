const helmet = require('helmet');
const AWS = require('aws-sdk');
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
const DOMAIN_SUFFIX = process.env.DOMAIN_SUFFIX || 'aws.localhost';
const DEFAULT_REGION = process.env.DEFAULT_REGION || 'eu-west-1';

function getCredentials(req) {
    const accessKeyId = req.headers['x-aws-access-key-id'] || req.query.aws_access_key_id || 'mock';
    const secretAccessKey = req.headers['x-aws-secret-access-key'] || req.query.aws_secret_access_key || 'mock';
    return new AWS.Credentials(accessKeyId, secretAccessKey);
}

function getRegion(req) {
    return req.headers['x-aws-region'] || req.query.aws_region || DEFAULT_REGION;
}

function getEndpoint(req, service) {
    const override = req.headers['x-aws-endpoint'] || req.query.aws_endpoint;
    if (override) {
        return override.startsWith('http') ? override : `http://${override}`;
    }
    const region = getRegion(req);
    return `http://${service}.${region}.${DOMAIN_SUFFIX}`;
}

function getHttpStatus(err) {
    if (err.statusCode && typeof err.statusCode === 'number') {
        return err.statusCode;
    }
    if (err.code === 'XMLParserError' || err.code === 'NetworkingError') {
        return 503;
    }
    return 500;
}

function handleAWSError(req, res, err) {
    const status = getHttpStatus(err);
    console.error('[%s] %s %s - %s (code: %s)', new Date().toISOString(), req.method, req.url, err.message, err.code);
    res.status(status).json({
        error: err.code || 'UnknownError',
        message: err.message,
    });
}

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    const origin = req.headers.origin || '*';
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-aws-access-key-id, x-aws-secret-access-key, x-aws-region, x-aws-endpoint');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        version: require('./package.json').version,
        domain: DOMAIN_SUFFIX,
        region: DEFAULT_REGION,
        services: ['s3', 'iam', 'sqs', 'sns', 'dynamodb', 'cognito', 'ssm', 'cloudwatch', 'logs'],
    });
});

// Service status - check if a service is reachable
app.get('/status/:service', (req, res) => {
    const service = req.params.service;
    const region = getRegion(req);
    const endpoint = getEndpoint(req, service);
    const credentials = getCredentials(req);

    const config = {
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
        httpOptions: { timeout: 3000 },
    };

    let client;
    switch (service) {
        case 's3': client = new AWS.S3(config); break;
        case 'iam': client = new AWS.IAM(config); break;
        case 'sqs': client = new AWS.SQS(config); break;
        case 'sns': client = new AWS.SNS(config); break;
        case 'dynamodb': client = new AWS.DynamoDB(config); break;
        default:
            return res.status(400).json({ error: 'Unknown service', service });
    }

    const testOps = {
        s3: cb => client.listBuckets(cb),
        iam: cb => client.listUsers(cb),
        sqs: cb => client.listQueues(cb),
        sns: cb => client.listTopics(cb),
        dynamodb: cb => client.listTables(cb),
    };

    testOps[service]((err) => {
        if (err) {
            res.json({ service, status: 'offline', error: err.message });
        } else {
            res.json({ service, status: 'online' });
        }
    });
});

// DynamoDB
app.get('/dynamodb/list-tables', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'dynamodb');

    const dynamodb = new AWS.DynamoDB({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    dynamodb.listTables((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

app.get('/dynamodb/describe-table/:tableName', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'dynamodb');

    const dynamodb = new AWS.DynamoDB({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    dynamodb.describeTable({ TableName: req.params.tableName }, (err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// IAM
app.get('/iam/list-users', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'iam');

    const iam = new AWS.IAM({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    iam.listUsers((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

app.post('/iam/create-user', (req, res) => {
    const username = req.body.username;
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return res.status(400).json({ error: 'ValidationError', message: 'username is required' });
    }

    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'iam');

    const iam = new AWS.IAM({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    iam.createUser({ UserName: username.trim() }, (err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.status(201).json(data);
    });
});

app.delete('/iam/delete-user/:username', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'iam');

    const iam = new AWS.IAM({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    iam.deleteUser({ UserName: req.params.username }, (err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json({ message: `User ${req.params.username} deleted`, data });
    });
});

// S3
app.get('/s3/list-buckets', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 's3');

    const s3 = new AWS.S3({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
        s3ForcePathStyle: true,
    });

    s3.listBuckets((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

app.get('/s3/list-objects/:bucket', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 's3');

    const s3 = new AWS.S3({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
        s3ForcePathStyle: true,
    });

    s3.listObjectsV2({ Bucket: req.params.bucket, MaxKeys: 100 }, (err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// SNS
app.get('/sns/list-topics', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'sns');

    const sns = new AWS.SNS({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    sns.listTopics((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

app.get('/sns/list-subscriptions', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'sns');

    const sns = new AWS.SNS({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    sns.listSubscriptions((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// SQS
app.get('/sqs/list-queues', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'sqs');

    const sqs = new AWS.SQS({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    sqs.listQueues((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// Cognito
app.get('/cognito/list-user-pools', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'cognito-idp');

    const cognito = new AWS.CognitoIdentityServiceProvider({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    cognito.listUserPools({ MaxResults: 60 }, (err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// SSM
app.get('/ssm/list-parameters', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'ssm');

    const ssm = new AWS.SSM({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    ssm.describeParameters((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// CloudWatch
app.get('/cloudwatch/list-metrics', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'cloudwatch');

    const cw = new AWS.CloudWatch({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    cw.listMetrics((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// CloudWatch Logs
app.get('/logs/list-log-groups', (req, res) => {
    const credentials = getCredentials(req);
    const region = getRegion(req);
    const endpoint = getEndpoint(req, 'logs');

    const cwl = new AWS.CloudWatchLogs({
        apiVersion: 'latest',
        region,
        endpoint,
        credentials,
    });

    cwl.describeLogGroups((err, data) => {
        if (err) return handleAWSError(req, res, err);
        res.json(data);
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'NotFound', message: `Route ${req.method} ${req.url} not found` });
});

if (require.main === module) {
    app.listen(port, '0.0.0.0', () => {
        console.log(`[FakeWS Console API] listening on port ${port}`);
        console.log(`[FakeWS Console API] domain suffix: ${DOMAIN_SUFFIX}`);
        console.log(`[FakeWS Console API] default region: ${DEFAULT_REGION}`);
    });
}

module.exports = app;
