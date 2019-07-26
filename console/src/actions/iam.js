import RestClient from "../lib/RestClient";

export const getIAMUserCount = () => dispatch => {
    RestClient('/iam/list-users').then(r => {
        dispatch({
            type: 'GET_IAM_USER_COUNT',
            payload: r.data.Buckets.length,
        });
    });
};