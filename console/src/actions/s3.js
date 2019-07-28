import RestClient from '../lib/RestClient';

export const getS3BucketList = () => dispatch => {
    RestClient('s3', 'eu-west-1', 'list-buckets').then(r => {
        dispatch({
            type: 'GET_S3_BUCKET_COUNT',
            payload: r.data.Buckets.length,
        });

        dispatch({
            type: 'GET_S3_BUCKET_LIST',
            payload: r.data.Buckets,
        });
    }).catch(e => {
        dispatch({
            type: 'SERVICE_OFFLINE',
            payload: 's3'
        });
    });
}