import axios from 'axios';

const getConsoleAPI = () => {
    return 'http://localhost:3001';
};

const getAWSHeaders = () => {
    return [
        'aws_access_key_id=mock',
        'aws_secret_access_key=mock',
        'aws_s3_endpoint=s3.aws.develop',
        'region=eu-west-1',
    ].join("&");
};

const RestClient = (url, method, data = {}) => {
    const endpoint = getConsoleAPI() + url + '?' + getAWSHeaders();

    return axios(endpoint,{
        method: method,
        data,
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    })
};

export default RestClient;