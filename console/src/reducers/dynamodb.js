export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_DYNAMODB_COUNT':
            return {
                ...state,
                count: action.payload
            }

        case 'GET_DYNAMODB_LIST':
            return {
                ...state,
                list: action.payload
            }

        default:
            return state
    }
}