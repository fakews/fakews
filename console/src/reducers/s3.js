export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_S3_BUCKET_COUNT':
            return {
                ...state,
                count: action.payload,
            }

        case 'GET_S3_BUCKET_LIST':
            return {
                ...state,
                list: action.payload,
            }

        default:
            return state
    }
}