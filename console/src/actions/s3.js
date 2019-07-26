import RestClient from '../lib/RestClient';

export const getS3Count = () => dispatch => {
    RestClient('/s3/list-buckets').then(r => {
        dispatch({
            type: 'GET_S3_COUNT',
            payload: r.data.Buckets.length,
        });
    });
};