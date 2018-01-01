export const getIAMUserCount = () => dispatch => {
    dispatch({
        type: 'GET_IAM_USER_COUNT',
        payload: 3
    });
}