function createResponse(statusCode, data) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Add CORS headers if needed
        }
    };
}

module.exports = { createResponse };