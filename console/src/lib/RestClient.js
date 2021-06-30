import axios from 'axios';

const getConsoleAPI = () => {
    return 'http://localhost:3001';
};

const getAWSHeaders = (api, region) => {
    return [
        'aws_access_key_id=mock',
        'aws_secret_access_key=mock',
        `aws_region=${region}`,
        `aws_endpoint=${api}.${region}.aws.develop`,
    ].join("&");
};

const RestClient = (api, region, url, method = 'GET', data = {}) => {
    const endpoint = `${getConsoleAPI()}/${api}/${url}?${getAWSHeaders(api, region)}`

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
