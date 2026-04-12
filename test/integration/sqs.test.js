const AWS = require('aws-sdk');

const ENDPOINT = process.env.SQS_ENDPOINT || 'http://localhost:9324';
const REGION = process.env.AWS_REGION || 'eu-west-1';

const sqs = new AWS.SQS({
    endpoint: ENDPOINT,
    region: REGION,
    accessKeyId: 'mock1234',
    secretAccessKey: 'mock1234',
});

const QUEUE_NAME = `integration-test-${Date.now()}`;
let queueUrl;

describe('SQS Integration Tests', () => {
    afterAll(async () => {
        try {
            if (queueUrl) {
                await sqs.deleteQueue({ QueueUrl: queueUrl }).promise();
            }
        } catch (e) {
            // Queue may not exist
        }
    });

    it('should list queues', async () => {
        const data = await sqs.listQueues().promise();
        // QueueUrls may be undefined if no queues exist
        expect(data).toBeDefined();
    });

    it('should create a queue', async () => {
        const data = await sqs.createQueue({ QueueName: QUEUE_NAME }).promise();
        queueUrl = data.QueueUrl;
        expect(queueUrl).toBeDefined();
        expect(queueUrl).toContain(QUEUE_NAME);
    });

    it('should send a message', async () => {
        const data = await sqs.sendMessage({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify({ test: 'hello from FakeWS' }),
        }).promise();
        expect(data.MessageId).toBeDefined();
    });

    it('should receive the message', async () => {
        const data = await sqs.receiveMessage({
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 1,
        }).promise();
        expect(data.Messages).toBeDefined();
        expect(data.Messages.length).toBeGreaterThan(0);
        const body = JSON.parse(data.Messages[0].Body);
        expect(body.test).toBe('hello from FakeWS');

        // Delete the message
        await sqs.deleteMessage({
            QueueUrl: queueUrl,
            ReceiptHandle: data.Messages[0].ReceiptHandle,
        }).promise();
    });

    it('should get queue attributes', async () => {
        const data = await sqs.getQueueAttributes({
            QueueUrl: queueUrl,
            AttributeNames: ['All'],
        }).promise();
        expect(data.Attributes).toBeDefined();
    });
});
