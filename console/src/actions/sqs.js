import RestClient from "../lib/RestClient";

export const getSQSQueueList = () => dispatch => {
    RestClient('sqs', 'eu-west-1', 'list-queues').then(r => {
        let queues = r.data.QueueUrls || [];

        queues = queues.map(v => {
            return {
                Name: v.split("/").pop(),
                Url: v.replace("~^", "")
            }
        });

        dispatch({
            type: 'GET_SQS_QUEUE_COUNT',
            payload: queues.length,
        });

        dispatch({
            type: 'GET_SQS_QUEUE_LIST',
            payload: queues,
        });
    });
};