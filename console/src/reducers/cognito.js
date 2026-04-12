export default (state = { count: 0, list: [] }, action) => {
    switch (action.type) {
        case 'GET_COGNITO_POOL_COUNT':
            return { ...state, count: action.payload };
        case 'GET_COGNITO_POOL_LIST':
            return { ...state, list: action.payload };
        default:
            return state;
    }
};
