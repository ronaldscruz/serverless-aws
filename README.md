# serverless-aws
Practicing Serverless with AWS Lambda (optimizing images uploaded to S3)

## Requirements

- Serverless package installed globally
- Node ^12.18.0

## How to run

1 - Create a new user at your IAM and get his keys. Then execute the following command with his credentials

```
serverless config credentials -o --provider aws --key <key> --secret <secret-key>
```

2 - Change the default bucket name (`rscrz-serverless-aws`) to a non existent one inside *serverless.yml*

3 - Run deploy script by executing `npm run dev`


