const AWS = require('aws-sdk');

const ENDPOINT = process.env.S3_ENDPOINT || 'http://localhost:9000';
const REGION = process.env.AWS_REGION || 'eu-west-1';

const s3 = new AWS.S3({
    endpoint: ENDPOINT,
    region: REGION,
    accessKeyId: 'mock1234',
    secretAccessKey: 'mock1234',
    s3ForcePathStyle: true,
});

const TEST_BUCKET = `integration-test-${Date.now()}`;

describe('S3 Integration Tests', () => {
    afterAll(async () => {
        try {
            // Clean up: delete all objects then bucket
            const objects = await s3.listObjectsV2({ Bucket: TEST_BUCKET }).promise();
            if (objects.Contents && objects.Contents.length > 0) {
                await s3.deleteObjects({
                    Bucket: TEST_BUCKET,
                    Delete: { Objects: objects.Contents.map(o => ({ Key: o.Key })) },
                }).promise();
            }
            await s3.deleteBucket({ Bucket: TEST_BUCKET }).promise();
        } catch (e) {
            // Bucket may not exist if test failed early
        }
    });

    it('should list buckets', async () => {
        const data = await s3.listBuckets().promise();
        expect(data.Buckets).toBeDefined();
        expect(Array.isArray(data.Buckets)).toBe(true);
    });

    it('should create a bucket', async () => {
        const data = await s3.createBucket({ Bucket: TEST_BUCKET }).promise();
        expect(data.Location).toBeDefined();
    });

    it('should list the created bucket', async () => {
        const data = await s3.listBuckets().promise();
        const found = data.Buckets.find(b => b.Name === TEST_BUCKET);
        expect(found).toBeDefined();
    });

    it('should put an object', async () => {
        await s3.putObject({
            Bucket: TEST_BUCKET,
            Key: 'test-file.txt',
            Body: 'Hello from FakeWS integration test',
            ContentType: 'text/plain',
        }).promise();
    });

    it('should get the object back', async () => {
        const data = await s3.getObject({
            Bucket: TEST_BUCKET,
            Key: 'test-file.txt',
        }).promise();
        expect(data.Body.toString()).toBe('Hello from FakeWS integration test');
        expect(data.ContentType).toBe('text/plain');
    });

    it('should list objects in the bucket', async () => {
        const data = await s3.listObjectsV2({ Bucket: TEST_BUCKET }).promise();
        expect(data.Contents.length).toBe(1);
        expect(data.Contents[0].Key).toBe('test-file.txt');
    });

    it('should delete the object', async () => {
        await s3.deleteObject({
            Bucket: TEST_BUCKET,
            Key: 'test-file.txt',
        }).promise();
        const data = await s3.listObjectsV2({ Bucket: TEST_BUCKET }).promise();
        expect(data.Contents || []).toHaveLength(0);
    });
});
