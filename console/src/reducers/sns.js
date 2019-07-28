export default (state = {}, action) => {
    let copy = Object.assign({}, state);

    switch (action.type) {
        case 'GET_SNS_TOPICS_COUNT':
            copy.topics.count = action.payload;
            break;

        case 'GET_SNS_TOPICS_LIST':
            copy.topics.list = action.payload;
            break;

        case 'GET_SNS_SUBSCRIPTIONS_COUNT':
            copy.subscriptions.count = action.payload;
            break;

        case 'GET_SNS_SUBSCRIPTIONS_LIST':
            copy.subscriptions.list = action.payload;
            break;

        default:
            return state;
    }

    return copy;
}