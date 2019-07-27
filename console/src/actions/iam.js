import RestClient from "../lib/RestClient";

export const getIAMUserList = () => dispatch => {
    RestClient('iam', 'eu-west-1', 'list-users').then(r => {
        dispatch({
            type: 'GET_IAM_USER_COUNT',
            payload: r.data.Users.length,
        });

        dispatch({
            type: 'GET_IAM_USER_LIST',
            payload: r.data.Users,
        });
    });
};