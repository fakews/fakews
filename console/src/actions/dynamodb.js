import RestClient from "../lib/RestClient";

export const getDynamoDBCount = () => dispatch => {
    RestClient('/dynamodb/list-tables').then(r => {
        console.log(r);
        dispatch({
            type: 'GET_DYNAMODB_COUNT',
            payload: r.data.Buckets.length,
        });
    });
};