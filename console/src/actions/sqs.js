import RestClient from "../lib/RestClient";

export const getSQSCount = () => dispatch => {
    RestClient('/sqs/list-queues').then(r => {
        dispatch({
            type: 'GET_SQS_QUEUE_COUNT',
            payload: r.data.Buckets.length,
        });
    });
};