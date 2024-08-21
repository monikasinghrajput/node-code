const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    // Check if the event is from S3 (to update Lambda function) or a regular request
    if (event.Records && event.Records[0].s3) {
        const bucketName = 'node-code-bucket'; // S3 bucket ka naam
        const objectKey = 'lambda-deploy.zip'; // S3 object ka naam

        // Fetch the new code package from S3
        const params = {
            Bucket: bucketName,
            Key: objectKey
        };

        const zipFile = await s3.getObject(params).promise();

        // Update the Lambda function code
        const updateParams = {
            FunctionName: 'node-code-deploy', // Aapke Lambda function ka naam
            ZipFile: zipFile.Body
        };

        const result = await lambda.updateFunctionCode(updateParams).promise();
        console.log('Lambda function updated:', result);
    } else {
        // Default response when function is accessed normally
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'This site is rrunning' }),
        };
    }
};
