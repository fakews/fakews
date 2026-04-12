# FakeWS - Fake AWS for Local Development

A complete fake AWS environment that runs locally via Docker. Perfect for development, testing, and CI/CD pipelines without needing a real AWS account.

## Supported Services

| Service | Implementation | Port | Persistent |
|---------|---------------|------|-----------|
| **S3** | [MinIO](https://github.com/minio/minio) | 9000 (API), 9090 (Console) | Yes |
| **DynamoDB** | [DynamoDB Local](https://hub.docker.com/r/amazon/dynamodb-local/) | 8000 | No |
| **SQS** | [ElasticMQ](https://github.com/softwaremill/elasticmq) | 9324, 9325 (UI) | No |
| **SNS** | [s12v/sns](https://github.com/s12v/sns) | 9911 | Yes |
| **IAM** | [Motocker](https://github.com/picadoh/motocker) | 5050 | No |
| **Cognito** | [cognito-local](https://github.com/antimatter-studios/cognito-local) | 9229 | Yes |
| **SSM** | [ssm-local](https://github.com/antimatter-studios/ssm-local) | 9230 | Yes |
| **CloudWatch** | [Moto](https://github.com/getmoto/moto) | 5051 | No |
| **CloudWatch Logs** | [Moto](https://github.com/getmoto/moto) | 5052 | No |
| **Inspector Console** | Custom React + Express | 3000 (UI), 3001 (API) | - |

## Quick Start

### 1. Setup AWS Credentials

Create a mock profile in `~/.aws/credentials`:

```ini
[mock]
aws_access_key_id = mock1234
aws_secret_access_key = mock1234
```

### 2. Start Services

```bash
# Start all services
docker compose up -d

# Start specific services
docker compose up -d s3 dynamodb sqs

# Start the inspector console
docker compose up -d console
```

### 3. Use with AWS CLI

```bash
export AWS_PROFILE=mock

# S3
aws --endpoint=http://localhost:9000 s3 mb s3://my-bucket
aws --endpoint=http://localhost:9000 s3 ls

# DynamoDB
aws --endpoint=http://localhost:8000 dynamodb list-tables

# SQS
aws --endpoint=http://localhost:9324 sqs create-queue --queue-name test
aws --endpoint=http://localhost:9324 sqs list-queues

# IAM
aws --endpoint=http://localhost:5050 iam list-users

# SSM
aws --endpoint=http://localhost:9230 ssm put-parameter --name /test --value hello --type String

# Cognito
aws --endpoint=http://localhost:9229 cognito-idp list-user-pools --max-results 10
```

### 4. Use with AWS SDK

```javascript
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    endpoint: 'http://localhost:9000',
    accessKeyId: 'mock1234',
    secretAccessKey: 'mock1234',
    s3ForcePathStyle: true,
});

const buckets = await s3.listBuckets().promise();
```

## Configuration

Copy `.env.example` to `.env` to customize ports and settings:

```bash
cp .env.example .env
```

All ports are configurable via environment variables. See `.env.example` for the full list.

## Inspector Console

The FakeWS Inspector Console is a web UI for browsing your fake AWS resources.

- **Dashboard**: Overview of all services with resource counts
- **Per-service pages**: Browse S3 buckets, DynamoDB tables, SQS queues, SNS topics, IAM users, Cognito pools, SSM parameters, and CloudWatch metrics

Start it with `docker compose up -d console` and visit `http://localhost:3000`.

The Console API also exposes a `/health` endpoint and `/status/:service` endpoints for programmatic health checking.

## Testing

### Unit Tests (console-api)

```bash
cd console-api
yarn install
yarn test
```

### Integration Tests

Requires running Docker services:

```bash
# Start services first
docker compose up -d

# Run integration tests
cd test
yarn install
yarn test

# Or test individual services
yarn test:s3
yarn test:dynamodb
yarn test:sqs
yarn test:iam
yarn test:api
```

## Compatibility Notes

FakeWS services aim to be compatible with real AWS, but are not 100% identical. Known limitations:

- Services use mock credentials (`mock1234`) - real SigV4 signing is not enforced
- Some advanced features of each service may not be implemented
- Error responses may differ slightly from real AWS
- IAM policies are not actually enforced across services

This is a testing and development tool. Do not use it as a replacement for production AWS services.

## docker-dev-tools

If you use [docker-dev-tools](https://github.com/nicecatchman/docker-dev-tools), this project includes scripts for common operations. See `package.json` for available commands.
