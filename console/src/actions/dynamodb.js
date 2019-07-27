import RestClient from "../lib/RestClient";

export const getDynamoDBList = () => dispatch => {
    RestClient('dynamodb', 'eu-west-1', 'list-tables').then(r => {
        dispatch({
            type: 'GET_DYNAMODB_COUNT',
            payload: r.data.TableNames.length,
        });

        dispatch({
            type: 'GET_DYNAMODB_LIST',
            payload: r.data.TableNames,
        });
    });
};