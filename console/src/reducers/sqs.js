export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_SQS_QUEUE_COUNT':
            return {
                ...state,
                count: action.payload
            }

        case 'GET_SQS_QUEUE_LIST':
            return {
                ...state,
                list: action.payload
            }

        default:
            return state
    }
}