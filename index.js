exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'This site is perfectly running' }),
    };
};