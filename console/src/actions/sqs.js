import RestClient from "../lib/RestClient";

export const getSQSCount = () => dispatch => {
    RestClient('sqs', 'eu-west-1', 'list-queues').then(r => {
        let queues = r.data.QueueUrls || [];

        dispatch({
            type: 'GET_SQS_QUEUE_COUNT',
            payload: queues.length,
        });
    });
};