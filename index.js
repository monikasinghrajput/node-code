const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const Lambda = new AWS.Lambda();

exports.handler = async (event) => {
    // Your existing code
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'hello guys ! This site is running  fine ' }),
    };
};

