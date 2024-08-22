const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Lambda = new AWS.Lambda();

exports.handler = async (event) => {
    // Your existing code
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'This site is   running good' }),
    };
};

// Function to automatically update Lambda function from S3
exports.updateLambdaFromS3 = async () => {
    const bucketName = 'node-code-bucket'; // Your S3 bucket name
    const objectKey = 'lambda-deploy.zip'; // Your zip file name

    // Fetch the zip file from S3
    const params = {
        Bucket: bucketName,
        Key: objectKey
    };
    try {
        const code = await S3.getObject(params).promise();

        // Update Lambda Function with the binary content of the zip file
        const updateParams = {
            FunctionName: 'node-code-deploy', // Your Lambda function name
            ZipFile: code.Body // Binary content of the zip file
        };
        await Lambda.updateFunctionCode(updateParams).promise();

        console.log('Lambda function successfully updated');
        return {
            statusCode: 200,
            body: JSON.stringify('Lambda function successfully updated'),
        };
    } catch (error) {
        console.error('Error updating Lambda function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error updating Lambda function'),
        };
    }
};
