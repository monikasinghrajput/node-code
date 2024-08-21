const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const lambda = new AWS.Lambda();

exports.handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    try {
      // Fetch the updated code from S3
      const params = { Bucket: bucket, Key: key };
      const data = await s3.getObject(params).promise();

      // Update the Lambda function code
      const updateParams = {
        FunctionName: 'node-code-deploy', // Your Lambda function name
        ZipFile: data.Body // Assuming the S3 object is a zipped Lambda code
      };

      await lambda.updateFunctionCode(updateParams).promise();
      console.log('Lambda function updated successfully.');
    } catch (error) {
      console.error('Error processing S3 event:', error);
      throw error;
    }
  }
};
