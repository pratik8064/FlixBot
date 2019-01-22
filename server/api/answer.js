// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
// You can find your project ID in your Dialogflow agent settings
const projectId = 'moviebot-93a0c'; //https://dialogflow.com/docs/agents#settings
const sessionId = '1486656220806';
const languageCode = 'en-US';
const key = {
    "type": "service_account",
    "project_id": "moviebot-93a0c",
    "private_key_id": "",
    "private_key": "",
    "client_email": "dialogflow-rrribm@moviebot-93a0c.iam.gserviceaccount.com",
    "client_id": "101821559399424608940",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/dialogflow-rrribm%40moviebot-93a0c.iam.gserviceaccount.com"
};


let config = {
    credentials: {
        private_key: key.private_key,
        client_email: key.client_email
    }
}

const sessionClient = new dialogflow.SessionsClient(config);
// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);



//server.post('/getAnswer', function (req, res) {
function getAnswer(query, callback) {

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    //console.log(request);

    // Send request and log result
    sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            if (result.fulfillmentMessages && result.fulfillmentMessages.length > 0) {
                var msg = result.fulfillmentMessages[0];
                if (msg.text) {
                    msg = msg.text;
                    if (msg.text && msg.text.length > 0) {
                        var output = msg.text[0];
                        console.log(output);
                        callback(output);
                    }
                }
            }
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};
exports.getAnswer = getAnswer;