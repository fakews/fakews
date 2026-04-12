import RestClient from '../lib/RestClient';

export const getCloudWatchMetricList = () => dispatch => {
    RestClient('cloudwatch', 'eu-west-1', 'list-metrics').then(r => {
        const metrics = r.data.Metrics || [];
        dispatch({
            type: 'GET_CLOUDWATCH_METRIC_COUNT',
            payload: metrics.length,
        });
        dispatch({
            type: 'GET_CLOUDWATCH_METRIC_LIST',
            payload: metrics,
        });
    }).catch(() => {
        dispatch({ type: 'SERVICE_OFFLINE', payload: 'cloudwatch' });
    });
};

export const getLogGroupList = () => dispatch => {
    RestClient('logs', 'eu-west-1', 'list-log-groups').then(r => {
        const groups = r.data.logGroups || [];
        dispatch({
            type: 'GET_LOG_GROUP_COUNT',
            payload: groups.length,
        });
        dispatch({
            type: 'GET_LOG_GROUP_LIST',
            payload: groups,
        });
    }).catch(() => {
        dispatch({ type: 'SERVICE_OFFLINE', payload: 'logs' });
    });
};
