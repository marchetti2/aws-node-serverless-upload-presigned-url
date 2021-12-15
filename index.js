const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const s3 = new AWS.S3()

exports.handler = async () => {
    const result = await getUploadURL()
    return result
}

const getUploadURL = async function() {
  const randomID = parseInt(Math.random() * 10000000)
  const Key = `${randomID}.jpg`

  const s3Params = {
    Bucket: process.env.UploadBucket,
    Key,
    ContentType: 'image/jpeg',
  }
  
  return new Promise((resolve, _) => {
    resolve({
      statusCode: 200,
      isBase64Encoded: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uploadURL: s3.getSignedUrl("putObject", s3Params),
        photoFilename: Key,
      }),
    });
  });
}