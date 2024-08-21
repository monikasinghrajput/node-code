const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    try {
        if (event.Records && event.Records[0].s3) {
            const bucketName = 'node-code-bucket';
            const objectKey = 'lambda-deploy.zip';

            const params = {
                Bucket: bucketName,
                Key: objectKey
            };

            const zipFile = await s3.getObject(params).promise();

            const updateParams = {
                FunctionName: 'node-code-deploy',
                ZipFile: zipFile.Body
            };

            const result = await lambda.updateFunctionCode(updateParams).promise();
            console.log('Lambda function updated:', result);

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Lambda function updated successfully' }),
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'This site is perfectly running' }),
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
        };
    }
};
