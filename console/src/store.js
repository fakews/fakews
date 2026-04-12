import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
    iam: { count: 0, list: [] },
    s3: { count: 0, list: [] },
    sqs: { count: 0, list: [] },
    sns: {
        topics: { count: 0, list: [] },
        subscriptions: { count: 0, list: [] },
    },
    dynamodb: { count: 0, list: [] },
    cognito: { count: 0, list: [] },
    ssm: { count: 0, list: [] },
    cloudwatch: {
        metrics: { count: 0, list: [] },
        logGroups: { count: 0, list: [] },
    },
};

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
