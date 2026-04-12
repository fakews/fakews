const initialState = {
    metrics: { count: 0, list: [] },
    logGroups: { count: 0, list: [] },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CLOUDWATCH_METRIC_COUNT':
            return { ...state, metrics: { ...state.metrics, count: action.payload } };
        case 'GET_CLOUDWATCH_METRIC_LIST':
            return { ...state, metrics: { ...state.metrics, list: action.payload } };
        case 'GET_LOG_GROUP_COUNT':
            return { ...state, logGroups: { ...state.logGroups, count: action.payload } };
        case 'GET_LOG_GROUP_LIST':
            return { ...state, logGroups: { ...state.logGroups, list: action.payload } };
        default:
            return state;
    }
};
