const initialState = {
    topics: { count: 0, list: [] },
    subscriptions: { count: 0, list: [] },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SNS_TOPICS_COUNT':
            return {
                ...state,
                topics: { ...state.topics, count: action.payload },
            };

        case 'GET_SNS_TOPICS_LIST':
            return {
                ...state,
                topics: { ...state.topics, list: action.payload },
            };

        case 'GET_SNS_SUBSCRIPTIONS_COUNT':
            return {
                ...state,
                subscriptions: { ...state.subscriptions, count: action.payload },
            };

        case 'GET_SNS_SUBSCRIPTIONS_LIST':
            return {
                ...state,
                subscriptions: { ...state.subscriptions, list: action.payload },
            };

        default:
            return state;
    }
};
