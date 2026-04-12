import RestClient from '../lib/RestClient';

export const getSSMParameterList = () => dispatch => {
    RestClient('ssm', 'eu-west-1', 'list-parameters').then(r => {
        const params = r.data.Parameters || [];
        dispatch({
            type: 'GET_SSM_PARAMETER_COUNT',
            payload: params.length,
        });
        dispatch({
            type: 'GET_SSM_PARAMETER_LIST',
            payload: params,
        });
    }).catch(() => {
        dispatch({ type: 'SERVICE_OFFLINE', payload: 'ssm' });
    });
};
