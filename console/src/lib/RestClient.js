import axios from 'axios';

const CONSOLE_API = process.env.REACT_APP_CONSOLE_API || 'http://localhost:3001';
const DOMAIN_SUFFIX = process.env.REACT_APP_DOMAIN_SUFFIX || 'aws.localhost';
const DEFAULT_REGION = process.env.REACT_APP_DEFAULT_REGION || 'eu-west-1';
const AWS_ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY || 'mock';
const AWS_SECRET_KEY = process.env.REACT_APP_AWS_SECRET_KEY || 'mock';

const RestClient = (api, region, url, method = 'GET', data = {}) => {
    const endpoint = `${CONSOLE_API}/${api}/${url}`;
    const effectiveRegion = region || DEFAULT_REGION;

    return axios(endpoint, {
        method,
        data,
        headers: {
            'Content-Type': 'application/json',
            'x-aws-access-key-id': AWS_ACCESS_KEY,
            'x-aws-secret-access-key': AWS_SECRET_KEY,
            'x-aws-region': effectiveRegion,
            'x-aws-endpoint': `${api}.${effectiveRegion}.${DOMAIN_SUFFIX}`,
        },
    });
};

export const checkServiceStatus = (service) => {
    return axios.get(`${CONSOLE_API}/status/${service}`, {
        headers: {
            'x-aws-access-key-id': AWS_ACCESS_KEY,
            'x-aws-secret-access-key': AWS_SECRET_KEY,
            'x-aws-region': DEFAULT_REGION,
        },
    });
};

export const getHealthInfo = () => {
    return axios.get(`${CONSOLE_API}/health`);
};

export default RestClient;
