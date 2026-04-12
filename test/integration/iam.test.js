const AWS = require('aws-sdk');

const ENDPOINT = process.env.IAM_ENDPOINT || 'http://localhost:5050';
const REGION = process.env.AWS_REGION || 'eu-west-1';

const iam = new AWS.IAM({
    endpoint: ENDPOINT,
    region: REGION,
    accessKeyId: 'mock1234',
    secretAccessKey: 'mock1234',
});

const TEST_USER = `integration-test-user-${Date.now()}`;

describe('IAM Integration Tests', () => {
    afterAll(async () => {
        try {
            await iam.deleteUser({ UserName: TEST_USER }).promise();
        } catch (e) {
            // User may not exist
        }
    });

    it('should list users', async () => {
        const data = await iam.listUsers().promise();
        expect(data.Users).toBeDefined();
        expect(Array.isArray(data.Users)).toBe(true);
    });

    it('should create a user', async () => {
        const data = await iam.createUser({ UserName: TEST_USER }).promise();
        expect(data.User.UserName).toBe(TEST_USER);
        expect(data.User.UserId).toBeDefined();
    });

    it('should list the created user', async () => {
        const data = await iam.listUsers().promise();
        const found = data.Users.find(u => u.UserName === TEST_USER);
        expect(found).toBeDefined();
    });

    it('should get the user', async () => {
        const data = await iam.getUser({ UserName: TEST_USER }).promise();
        expect(data.User.UserName).toBe(TEST_USER);
    });

    it('should delete the user', async () => {
        await iam.deleteUser({ UserName: TEST_USER }).promise();
        const data = await iam.listUsers().promise();
        const found = data.Users.find(u => u.UserName === TEST_USER);
        expect(found).toBeUndefined();
    });
});
