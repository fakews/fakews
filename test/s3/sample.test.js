const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('http://s3.aws.develop');
const credentials = new AWS.Credentials('accessKey1', 'verySecretKey1');
const s3 = new AWS.S3({
    apiVersion: 'latest',
    endpoint: endpoint,
    credentials: credentials
});

it('can create bucket', async () => {
    const promise = await s3.createBucket({Bucket: 'test-bucket'}).promise();

    promise
        .then(data => {
            console.log({data});
            expect(true).toBe(true);
        })
        .catch(err => {
            console.log({err});
        });
    console.log({end_test:true});
});