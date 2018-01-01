import AWS from 'aws-sdk';

export const getS3Count = () => dispatch => {
    const credentials = new AWS.Credentials('mock', 'mock');
    //const credentials = new AWS.Credentials('AKIA2IOVZOL6RTIVFF5L', 'Ya3dOBqpwE2bBeSidPE1G+9xJCXrbHmPj6TO710/');

    const s3 = new AWS.S3({
        apiVersion: 'latest',
        region: 'eu-west-1',
        endpoint: 'http://s3.aws.develop',
        credentials
    });

    s3.listBuckets((err, data) => {
        console.log({err, data});

        dispatch({
            type: 'GET_S3_COUNT',
            payload: 3
        });
    });
}