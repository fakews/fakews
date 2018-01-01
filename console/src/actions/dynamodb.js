export const getDynamoDBCount = () => dispatch => {
    dispatch({
        type: 'GET_DYNAMODB_COUNT',
        payload: 3
    });
}