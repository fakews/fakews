const helmet = require('helmet');
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const port = 3001;

function getCredentials(query)
{
    return new AWS.Credentials(query.aws_access_key_id, query.aws_secret_access_key);
}

app.use(helmet());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/dynamodb/list-tables', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_endpoint;

    const dynamodb = new AWS.DynamoDB({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    dynamodb.listTables((err, data) => {
        res.send(data);
    });
});

app.get('/iam/list-users', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_endpoint;

    const iam = new AWS.IAM({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    iam.listUsers((err, data) => {
        if(err){
            console.log({url: req.url, message: err.message, code: err.code});
            res.status(err.code);
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

app.get('/s3/list-buckets', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_endpoint;

    const s3 = new AWS.S3({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    s3.listBuckets((err, data) => {
        if(err){
            console.log({url: req.url, message: err.message, code: err.code});
            res.status(err.code);
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

app.get('/sns/list-topics', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_endpoint;

    const sns = new AWS.SNS({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    sns.listTopics((err, data) => {
        if(err){
            console.log({url: req.url, message: err.message, code: err.code});
            res.status(err.code);
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

app.get('/sns/list-subscriptions', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_endpoint;

    const sns = new AWS.SNS({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    sns.listSubscriptions((err, data) => {
        if(err){
            console.log({url: req.url, message: err.message, code: err.code});
            res.status(err.code);
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

app.get('/sqs/list-queues', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_endpoint;

    const sqs = new AWS.SQS({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    sqs.listQueues((err, data) => {
        if(err){
            console.log({url: req.url, message: err.message, code: err.code});
            res.status(err.code);
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

app.listen(port, () => console.log(`AWS Console Proxy app listening on port ${port}!`));