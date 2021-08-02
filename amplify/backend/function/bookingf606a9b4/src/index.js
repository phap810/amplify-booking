
const AWS = require('aws-sdk');

const stepFunctions = new AWS.StepFunctions({
    region: 'us-east-2'
});

exports.handler = (event, context, callback) => {
    console.log(event)

    const params = {
        stateMachineArn: 'arn:aws:states:us-east-2:661965836311:stateMachine:SendMailtrapStateMachine-CE6QMo1CgSrj',
        input: JSON.stringify({ patient: event.arguments.data.patient, doctor: event.arguments.data.doctor, datetime:event.arguments.data.datetime })

    };
    console.log(params)
    stepFunctions.startExecution(params, (err, data) => {
        if (err) {
            console.log(err);
            const response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'There was an error'
                })
            };
            callback(null, response);
        } else {
            console.log(data);
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Step function worked'
                })
            };
            callback(null, response);
        }
    });
};