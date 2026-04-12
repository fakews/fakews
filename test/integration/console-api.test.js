const axios = require('axios');

const API_URL = process.env.CONSOLE_API_URL || 'http://localhost:3001';

describe('Console API Integration Tests', () => {
    it('GET /health returns service info', async () => {
        const res = await axios.get(`${API_URL}/health`);
        expect(res.status).toBe(200);
        expect(res.data.status).toBe('ok');
        expect(res.data.services).toContain('s3');
    });

    it('GET /s3/list-buckets returns bucket list', async () => {
        const res = await axios.get(`${API_URL}/s3/list-buckets`, {
            headers: {
                'x-aws-access-key-id': 'mock1234',
                'x-aws-secret-access-key': 'mock1234',
                'x-aws-region': 'eu-west-1',
            },
        });
        expect(res.status).toBe(200);
        expect(res.data.Buckets).toBeDefined();
    });

    it('GET /dynamodb/list-tables returns table list', async () => {
        const res = await axios.get(`${API_URL}/dynamodb/list-tables`, {
            headers: {
                'x-aws-access-key-id': 'mock1234',
                'x-aws-secret-access-key': 'mock1234',
                'x-aws-region': 'eu-west-1',
            },
        });
        expect(res.status).toBe(200);
        expect(res.data.TableNames).toBeDefined();
    });

    it('GET /iam/list-users returns user list', async () => {
        const res = await axios.get(`${API_URL}/iam/list-users`, {
            headers: {
                'x-aws-access-key-id': 'mock1234',
                'x-aws-secret-access-key': 'mock1234',
                'x-aws-region': 'eu-west-1',
            },
        });
        expect(res.status).toBe(200);
        expect(res.data.Users).toBeDefined();
    });

    it('GET /sqs/list-queues returns queue list', async () => {
        const res = await axios.get(`${API_URL}/sqs/list-queues`, {
            headers: {
                'x-aws-access-key-id': 'mock1234',
                'x-aws-secret-access-key': 'mock1234',
                'x-aws-region': 'eu-west-1',
            },
        });
        expect(res.status).toBe(200);
    });

    it('POST /iam/create-user validates username', async () => {
        try {
            await axios.post(`${API_URL}/iam/create-user`, {}, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
            expect(err.response.data.error).toBe('ValidationError');
        }
    });

    it('GET /status/:service returns service status', async () => {
        const res = await axios.get(`${API_URL}/status/s3`, {
            headers: {
                'x-aws-access-key-id': 'mock1234',
                'x-aws-secret-access-key': 'mock1234',
                'x-aws-region': 'eu-west-1',
            },
        });
        expect(res.status).toBe(200);
        expect(res.data.service).toBe('s3');
        expect(['online', 'offline']).toContain(res.data.status);
    });

    it('GET /nonexistent returns 404', async () => {
        try {
            await axios.get(`${API_URL}/nonexistent`);
        } catch (err) {
            expect(err.response.status).toBe(404);
            expect(err.response.data.error).toBe('NotFound');
        }
    });
});
