# FakeWS
A Fake Amazon Webservices. 

This project is a collection is mock services which provide similar functionality to AWS except it all runs locally. This is perfect for testing things out either in your integration tests, etc, etc. It has limited usefulness since AWS is already available. But perhaps you don't have a 'test' account to play with. Just a real live environment. Then this project might be of use to you.

It's not guaranteed in any way that the services here are 100% compatible with AWS. Most likely corner cases and probably in mocked services from moto, things might succeed which on the real AWS wouldn't work. This is after all just a mock system and you have to realise there are limitations to it's abilities.

## AWS Credentials
For everything to work automatically without having to tamper with your local system, a minimum of a mocked set of credentials must be provided for local aws services. It's a good idea to standardise on a set of credentials which don't mention names, projects, or companies. But something totally generic.

Please create in the `$HOME/.aws/credentials` file, a new section with the following text
```
[mock]
aws_access_key_id = mock1234
aws_secret_access_key = mock1234
```

These credentials are generic, safe, and 99.99% sure won't interfere with any other credentials that might be installed. It also makes them perfect for using by other AWS projects which might be running locally.

It is possible to customise these values, but realise that customising these values makes a lot of automatic functionality stop working unless they are consistently changed in all places that they are used and it's not really feasible to write instructions on where to change all of these values. So if the developer wishes to take on this maintenance burden. They must do it alone and manage all the consequences of all the potential misconfigurations. 

Advice: leave the defaults alone unless you have a good reason to change them

## FakeWS Amazon Console

There is a small user interface letting you inspect various aws components created and maintained. But it's extremely limited and it's mainly for inspecting data and not doing anything fancy.

It's available using the "console" docker service, ```docker-compose up console``` to see it in action. It will launch a console-api container with an express app to proxy requests to the AWS services, sidestepping the CORS problem that some services have (S3 can't list buckets for example).

![FakeWS Inspector Console](fakews-console.png)

### Supported Services and Functionality

- IAM: Provided by https://github.com/picadoh/motocker
    - List Users
    - Create Users
- S3: Provided by https://github.com/minio/minio
    - Persists data to disk (unknown how much)
    - List Buckets
    - Supports a GUI Console service "s3-console" which starts a web console on http://minio.aws.develop
- SQS: Provided by https://github.com/softwaremill/elasticmq
    - List Queues
- SNS: Provided by https://github.com/s12v/sns
    - Persists data to disk (unknown how much)
    - List Topics
    - List Subscriptions
- DynamoDB: Provided by https://hub.docker.com/r/amazon/dynamodb-local/
    - List Tables

### Could be interesting?

I'm just going to drop some links here to keep track of things as I find them.

- https://airbnb.io/airpal/