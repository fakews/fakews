export const getSQSCount = () => dispatch => {
    dispatch({
        type: 'GET_SQS_COUNT',
        payload: 3
    });
}