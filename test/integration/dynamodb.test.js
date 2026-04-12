const AWS = require('aws-sdk');

const ENDPOINT = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const REGION = process.env.AWS_REGION || 'eu-west-1';

const dynamodb = new AWS.DynamoDB({
    endpoint: ENDPOINT,
    region: REGION,
    accessKeyId: 'mock1234',
    secretAccessKey: 'mock1234',
});

const docClient = new AWS.DynamoDB.DocumentClient({
    service: dynamodb,
});

const TABLE_NAME = `integration-test-${Date.now()}`;

describe('DynamoDB Integration Tests', () => {
    afterAll(async () => {
        try {
            await dynamodb.deleteTable({ TableName: TABLE_NAME }).promise();
        } catch (e) {
            // Table may not exist
        }
    });

    it('should list tables', async () => {
        const data = await dynamodb.listTables().promise();
        expect(data.TableNames).toBeDefined();
        expect(Array.isArray(data.TableNames)).toBe(true);
    });

    it('should create a table', async () => {
        const data = await dynamodb.createTable({
            TableName: TABLE_NAME,
            AttributeDefinitions: [
                { AttributeName: 'PK', AttributeType: 'S' },
                { AttributeName: 'SK', AttributeType: 'S' },
            ],
            KeySchema: [
                { AttributeName: 'PK', KeyType: 'HASH' },
                { AttributeName: 'SK', KeyType: 'RANGE' },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        }).promise();
        expect(data.TableDescription.TableName).toBe(TABLE_NAME);
    });

    it('should describe the table', async () => {
        const data = await dynamodb.describeTable({ TableName: TABLE_NAME }).promise();
        expect(data.Table.TableName).toBe(TABLE_NAME);
        expect(data.Table.KeySchema).toHaveLength(2);
    });

    it('should put an item', async () => {
        await docClient.put({
            TableName: TABLE_NAME,
            Item: {
                PK: 'USER#123',
                SK: 'PROFILE',
                name: 'Test User',
                email: 'test@example.com',
            },
        }).promise();
    });

    it('should get the item back', async () => {
        const data = await docClient.get({
            TableName: TABLE_NAME,
            Key: { PK: 'USER#123', SK: 'PROFILE' },
        }).promise();
        expect(data.Item.name).toBe('Test User');
        expect(data.Item.email).toBe('test@example.com');
    });

    it('should query items', async () => {
        const data = await docClient.query({
            TableName: TABLE_NAME,
            KeyConditionExpression: 'PK = :pk',
            ExpressionAttributeValues: { ':pk': 'USER#123' },
        }).promise();
        expect(data.Items).toHaveLength(1);
    });

    it('should delete the item', async () => {
        await docClient.delete({
            TableName: TABLE_NAME,
            Key: { PK: 'USER#123', SK: 'PROFILE' },
        }).promise();
        const data = await docClient.get({
            TableName: TABLE_NAME,
            Key: { PK: 'USER#123', SK: 'PROFILE' },
        }).promise();
        expect(data.Item).toBeUndefined();
    });
});
