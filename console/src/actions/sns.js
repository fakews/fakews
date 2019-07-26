import RestClient from "../lib/RestClient";

export const getSNSCount = () => dispatch => {
    RestClient('sns', 'eu-west-1', 'list-topics').then(r => {
        dispatch({
            type: 'GET_SNS_TOPIC_COUNT',
            payload: r.data.Buckets.length,
        });
    });
};