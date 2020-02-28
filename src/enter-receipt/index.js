const uuidv4 = require('uuid/v4');
const AWS = require('aws-sdk');
const EXPENSE_TABLE_NAME = process.env.EXPENSE_TABLE_NAME;

exports.handler = async (event) => {

    const inputReceipt = JSON.parse(event.body)

    const expenseId = uuidv4();
    const receipt = {
        expenseId: expenseId,
        issuer: inputReceipt.issuer,
        expenseDate: new Date(inputReceipt.expenseDate),
        description: inputReceipt.description,
        amount: inputReceipt.amount,
        currency: inputReceipt.currency,
        location: inputReceipt.location
    }

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    await dynamodb.put({
        TableName: EXPENSE_TABLE_NAME,
        Item: receipt
    }).promise();

    let readFromDB = await dynamodb.get({
        TableName: EXPENSE_TABLE_NAME,
        Key: {expenseId: expenseId}
    }).promise();

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(readFromDB),
    };

    return response;
};
