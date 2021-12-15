# File uploads using S3 presigned URLs and Lambda

This Serverless example application shows how to upload image to S3 using signed URLs, API Gateway and Lambda.

The approach allows you to upload directly to Amazon S3 using a predefined URL. This offloads all the bandwidth and compute requirements away from your application, and instead relies on the massive scalability of S3.

```bash
.
├── README.MD             <-- This instructions file
├── frontend              <-- Simple front-end application to upload
├── index.js              <-- The lambda function
├── serverless.yml        <-- Serverless framework deployment properties file
```
### Requirements
* [Node.js](https://nodejs.org/en/)
* Npm which comes with Node.js
or
* [Yarn](https://yarnpkg.com/)
* [Serverless](https://www.serverless.com/)

### Setup
Open `serverless.yml` and edit:
- Choose a unique S3 bucket name:
```yaml
  custom:
    bucketName:  # your-bucket-name
    ...
```
- If you prefer to use a different region or stage, change these:
```yaml
  provider:
    ...
    stage:  # default is 'dev'
    region:  # default is 'us-east-1'
    ...
```

### Credentials
Follow these steps to create an IAM user for the Serverless Framework:

- Login to your AWS account and go to the Identity & Access Management (IAM) page
- Click on Users and then Add user. Enter a name in the first field to remind you this User is related to the Serverless Framework, like serverless-admin. Enable Programmatic access by clicking the checkbox. Click Next to go through to the Permissions page. Click on Attach existing policies directly. Search for and select AdministratorAccess then click Next: Review. Check to make sure everything looks good and click Create user.
- View and copy the API Key & Secret to a temporary place. You'll need it in the next step.

Using AWS Access Keys, run:
```bash
serverless config credentials --provider aws --key <<API Key>> --secret <<Secret>>
```

### Deploy
Run the following the fire the deployment:
```bash
serverless deploy --verbose #this optional verbose tag shows all deployment logs. 
```
The output should look similar to:
```bash
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
...
Serverless: Stack create finished...
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (3.85 MB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...

Service Information
service: upload-to-s3-with-signedUrl
stage: dev
region: us-east-1
stack: # bucket name
resources: 14
api keys:
  None
endpoints:
  GET - https://t8oh7r3yx8.execute-api.us-east-1.amazonaws.com/dev/uploadimgless
functions:
  upload: uploadimgless
layers:
  None
```
The upload URL is the **'endpoints'** output. For example - https://t9oh8r2yx4.execute-api.us-east-1.amazonaws.com/dev/uploadimgless

###Testing with the frontend application
The frontend code is saved in the frontend subdirectory.

From the .env.example file at the root of the frontend subdirectory, create another file called .env using the same structure and set the upload Url(endpoint from the deployment serverless).

install dependencies:
```bash
cd frontend
yarn
```
run :
```bash
yarn start
```

Once the page is loaded from a remote location, upload a JPG file in the front-end and you will see the object in the backend S3 bucket.
