exports.handler = async (event) => {
    inputReceipt = JSON.parse(event.body);

    id = event.pathParameters.id;

    const receipt = {
        issuer: inputReceipt.issuer+"-"+id,
        expenseDate: new Date(inputReceipt.expenseDate),
        description: inputReceipt.description,
        amount: inputReceipt.amount,
        currency: inputReceipt.currency,
        location: inputReceipt.location
    }


    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(receipt),
    };

    return response;
};
