const request = require('supertest');
const app = require('../server');

// Close server after tests
let server;
beforeAll(() => {
    // The app exports but also calls listen - we need to handle that
    // For testing, we use supertest which creates its own server
});

afterAll((done) => {
    done();
});

describe('Health endpoint', () => {
    it('GET /health returns status ok', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
        expect(res.body.version).toBeDefined();
        expect(res.body.domain).toBe('aws.localhost');
        expect(res.body.region).toBe('eu-west-1');
        expect(Array.isArray(res.body.services)).toBe(true);
        expect(res.body.services).toContain('s3');
        expect(res.body.services).toContain('dynamodb');
        expect(res.body.services).toContain('sqs');
        expect(res.body.services).toContain('sns');
        expect(res.body.services).toContain('iam');
        expect(res.body.services).toContain('cognito');
        expect(res.body.services).toContain('ssm');
        expect(res.body.services).toContain('cloudwatch');
        expect(res.body.services).toContain('logs');
    });
});

describe('CORS', () => {
    it('OPTIONS request returns 204 with CORS headers', async () => {
        const res = await request(app)
            .options('/health')
            .set('Origin', 'http://localhost:3000');
        expect(res.statusCode).toBe(204);
        expect(res.headers['access-control-allow-origin']).toBeDefined();
        expect(res.headers['access-control-allow-methods']).toContain('GET');
        expect(res.headers['access-control-allow-methods']).toContain('POST');
        expect(res.headers['access-control-allow-methods']).toContain('DELETE');
    });

    it('GET request includes CORS headers', async () => {
        const res = await request(app)
            .get('/health')
            .set('Origin', 'http://localhost:3000');
        expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    });
});

describe('404 handler', () => {
    it('returns 404 for unknown routes', async () => {
        const res = await request(app).get('/nonexistent/route');
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('NotFound');
        expect(res.body.message).toContain('/nonexistent/route');
    });
});

describe('IAM create-user validation', () => {
    it('returns 400 when username is missing', async () => {
        const res = await request(app)
            .post('/iam/create-user')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('ValidationError');
        expect(res.body.message).toContain('username');
    });

    it('returns 400 when username is empty string', async () => {
        const res = await request(app)
            .post('/iam/create-user')
            .send({ username: '' });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('ValidationError');
    });

    it('returns 400 when username is whitespace only', async () => {
        const res = await request(app)
            .post('/iam/create-user')
            .send({ username: '   ' });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('ValidationError');
    });
});

describe('Status endpoint', () => {
    it('returns 400 for unknown service', async () => {
        const res = await request(app).get('/status/foobar');
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Unknown service');
    });
});

describe('Request headers', () => {
    it('accepts credentials via x-aws-* headers', async () => {
        // This will fail to connect to the service (no docker running),
        // but it should parse the headers without error
        const res = await request(app)
            .get('/dynamodb/list-tables')
            .set('x-aws-access-key-id', 'test-key')
            .set('x-aws-secret-access-key', 'test-secret')
            .set('x-aws-region', 'us-east-1');
        // Will get a connection error since no docker services running,
        // but should not be a 400 validation error
        expect([500, 503]).toContain(res.statusCode);
        expect(res.body.error).toBeDefined();
    });

    it('falls back to query parameters for backward compatibility', async () => {
        const res = await request(app)
            .get('/dynamodb/list-tables?aws_access_key_id=mock&aws_secret_access_key=mock&aws_region=eu-west-1');
        expect([500, 503]).toContain(res.statusCode);
    });
});

describe('Helmet security headers', () => {
    it('includes security headers', async () => {
        const res = await request(app).get('/health');
        // Helmet sets various security headers
        expect(res.headers['x-content-type-options']).toBe('nosniff');
        expect(res.headers['x-frame-options']).toBeDefined();
    });
});
