import RestClient from "../lib/RestClient";

export const getSNSCount = () => dispatch => {
    RestClient('/sns/list-streams').then(r => {
        dispatch({
            type: 'GET_SNS_COUNT',
            payload: r.data.Buckets.length,
        });
    });
};