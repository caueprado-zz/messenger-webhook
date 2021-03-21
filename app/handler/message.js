module.exports.handle = function(application, req, res) {
    // sender_psid, received_message) {
    let response;
    if (req.received_message) {    
        response = {
        "text": `You sent the message: "${req.received_message}". Now send me an attachment!`
        }
        console.log(response);

    } else if (req.attachments) {
        let attachment_url = req.attachments[0].payload.url;
        response = {
        "attachment": {
            "type": "template",
            "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Is this the right picture?",
                "subtitle": "Tap a button to answer.",
                "image_url": attachment_url,
                "buttons": [
                {
                    "type": "postback",
                    "title": "Yes!",
                    "payload": "yes",
                },
                {
                    "type": "postback",
                    "title": "No!",
                    "payload": "no",
                }
                ],
            }]
            }
        }
        }
    } 
    console.log('callSendAPI');
    callSendAPI(req.sender_psid, response);     
    
}

const request = require('request');
function callSendAPI(sender_psid, response) {
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }
