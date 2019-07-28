import RestClient from "../lib/RestClient";

export const getSNSTopicList = () => dispatch => {
    RestClient('sns', 'eu-west-1', 'list-topics').then(r => {
        dispatch({
            type: 'GET_SNS_TOPICS_COUNT',
            payload: r.data.Topics.length,
        });

        dispatch({
            type: 'GET_SNS_TOPICS_LIST',
            payload: r.data.Topics,
        });
    });
};

export const getSNSSubscriptionList = () => dispatch => {
    RestClient('sns', 'eu-west-1', 'list-subscriptions').then(r => {
        dispatch({
            type: 'GET_SNS_SUBSCRIPTIONS_COUNT',
            payload: r.data.Subscriptions.length,
        });

        dispatch({
            type: 'GET_SNS_SUBSCRIPTIONS_LIST',
            payload: r.data.Subscriptions,
        });
    });
};