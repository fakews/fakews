import RestClient from "../lib/RestClient";

export const getIAMUserList = () => dispatch => {
    return RestClient('iam', 'eu-west-1', 'list-users').then(r => {
        dispatch({
            type: 'GET_IAM_USER_COUNT',
            payload: r.data.Users.length,
        });

        dispatch({
            type: 'GET_IAM_USER_LIST',
            payload: r.data.Users,
        });
    }).catch(e => {
        dispatch({
            type: 'SERVICE_OFFLINE',
            payload: 'iam'
        });
    });
};

export const createIAMUser = (username, props) => dispatch => {
    return RestClient('iam', 'eu-west-1', 'create-user', 'POST', {username}).then(r => {
        console.log(r.data);
        dispatch({
            type: 'USER_CREATED',
            payload: {},
        });

        props.history.push('/iam');
    });
}