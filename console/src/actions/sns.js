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
    }).catch(e => {
        dispatch({
            type: 'SERVICE_OFFLINE',
            payload: 'sns'
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
    }).catch(e => {
        dispatch({
            type: 'SERVICE_OFFLINE',
            payload: 'sns'
        });
    });
};