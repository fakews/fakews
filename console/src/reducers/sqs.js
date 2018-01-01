export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_SQS_COUNT':
            return {
                ...state,
                count: action.payload
            }

        default:
            return state
    }
}