// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
// You can find your project ID in your Dialogflow agent settings
const projectId = 'moviebot-93a0c'; //https://dialogflow.com/docs/agents#settings
const sessionId = '1486656220806';
const languageCode = 'en-US';
const key = {
    "type": "service_account",
    "project_id": "moviebot-93a0c",
    "private_key_id": "440b3eb1e27962d7df5625358b682830a89ee591",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCw/YNZadrxU8fy\nVRvxkyVu6lcoPGNRCewgSR6Z4xFgD+pIXD32caF47+YLyhUIEUnAIQpT/3SiX4GN\naKWWb4l2xBnp3bCIU2fKM6wqOCS1yqkYi8xVQdWdNevbjUjbBUOSMxSYyjVUruCm\n8WwM94S8nGJp3gMFG9yQFbBkruRi8o46+ew0gktp2heUaNqddFBZuOyG5p7c+U2Z\n2DkBIaVSztrB+Y/nKjs7xXoywZN8+AtXlJKDJyfqgeK53vjiD/yIa6cgieKr5WON\nQ/OBbTgld6037KhbG7xCt1cWOqyR91/6wtqbon5HuFro34GDKCTUkGjhma68LPf8\n+fR6YBj3AgMBAAECggEAJ4DV5cmSJAX6nTRw0bjxhHGKdYEQ+7/2s3gOe/Np5+J1\nfKQV8mEHVMpasqvuiMfvCZJ2Tyw3uJwPeuPt/Yc0i80WKZQg+DSBeGiTFzNDwk2S\n81cUirzwdC/aTj0ZE0V4APQktzt+rsF/g9Njtfsy5bQT5SQ30VaYIpKstbQxZoHz\nsA63sTngcvusAx4KV7DfeSrQQTfkMXSfudf5n0VIRvVMDDXP7V1dSN5ltpJlEozg\nWXZvcKfy3Ly8Op8uDTunuvhzc2geux7qHgtBTV0RifuLSRxVd1H4PTxRibpCOJq/\nPCeeHCjVM5yizjfzo0JeI4aHd7pmSACv6ilR+FiVzQKBgQD3nY2ZZEkwPjwhxGNb\nAVNz1orcGlghSQXuxkZOLLbsSo/C9gwlXwtecBoompxRe7mTGVakl730Lb4p40T+\nk18kVicjZjLnQrC3TvcnQGkQcBXlfkK1NWxy6jksO47tyLIFLEAeK6cdu1ab+51N\nitUCE0S4n2Z7UmUfnNWgl9zpiwKBgQC2+795+TW5rpO2mgU13Tq3diUsxE4zfSrN\nc96VD3fHJI2w7Ianq1qyXk8sTLRRzPxwagQxwMDmlGel+7Azi/6B0Qt6sONJlcCy\nSDL+swfVA5o8D/OsL4EJz/tZamChcp0nF5TEOrn+qieDAUROQNUcXnRIaQUp3jMh\nKEPT4uNDxQKBgHmbXQFqaS9SQUHsK0d0fUG0qfmyznl6XXmI0tptx2CAtd3v7MMl\nzHWS5KXwWLkD5H3DwfOPunCDTpNP1ICaa+1yikIuXO2KqTM9itAyJ+c0xOwyeBx6\nokpFkdKRZX6ORC+aLdsjYS2O5dgxWG3OsxIT2Ho7fp8uNg+yfJAkRRBFAoGAHFec\nDeF639rZiFQM8I3mtVn4Yhm53yHJCm+jD0WJEPBpffj01m2lK7GN49exqmXsx+Cz\n65zmhBCCiWQVo7ZQYn0loQha/B/U7Ahg1bCXSvg24Iy7+nSVMRbk4LGoa/lbvB1b\n7pUGEBr86b69fL1wBOfgbQLPSO/gzYb2EpC3EN0CgYBvN+OAftUBHuXreWk9b4Fy\nqkgir7V1EckIhzMYNOto6DV4IN/wVphKVbf8zUnFfljL/QQphkqMZChk0F1seflp\n1tcvcJFQK1FIJP7/R5bVVRrJCPS407qtcqFKYNd77DuCRqAO3LW/2H2gfFhv3XBG\nJAIdj48IAv47a8S+1AM4Dg==\n-----END PRIVATE KEY-----\n",
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