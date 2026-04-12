import RestClient from '../lib/RestClient';

export const getCognitoUserPoolList = () => dispatch => {
    RestClient('cognito', 'eu-west-1', 'list-user-pools').then(r => {
        const pools = r.data.UserPools || [];
        dispatch({
            type: 'GET_COGNITO_POOL_COUNT',
            payload: pools.length,
        });
        dispatch({
            type: 'GET_COGNITO_POOL_LIST',
            payload: pools,
        });
    }).catch(() => {
        dispatch({ type: 'SERVICE_OFFLINE', payload: 'cognito' });
    });
};
