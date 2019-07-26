const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const port = 3000;

app.get('/s3/list-buckets', (req, res) => {
    const credentials = new AWS.Credentials(req.query.aws_access_key_id, req.query.aws_secret_access_key);

    const s3 = new AWS.S3({
        apiVersion: 'latest',
        region: req.query.aws_region,
        endpoint: 'http://' + req.query.aws_s3_endpoint,
        credentials
    });

    s3.listBuckets((err, data) => {
        return res.send(data);
    });
});

app.listen(port, () => console.log(`AWS Console Proxy app listening on port ${port}!`));