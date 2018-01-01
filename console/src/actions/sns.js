export const getSNSCount = () => dispatch => {
    dispatch({
        type: 'GET_SNS_COUNT',
        payload: 3
    });
}