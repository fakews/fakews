import RestClient from "../lib/RestClient";

export const getDynamoDBCount = () => dispatch => {
    RestClient('dynamodb', 'eu-west-1', 'list-tables').then(r => {
        dispatch({
            type: 'GET_DYNAMODB_COUNT',
            payload: r.data.TableNames.length,
        });
    });
};