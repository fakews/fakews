export default (state = { count: 0, list: [] }, action) => {
    switch (action.type) {
        case 'GET_SSM_PARAMETER_COUNT':
            return { ...state, count: action.payload };
        case 'GET_SSM_PARAMETER_LIST':
            return { ...state, list: action.payload };
        default:
            return state;
    }
};
