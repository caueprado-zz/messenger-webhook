module.exports = function(application){

    application.post('/webhook', (req, res) => {  
        let body = req.body;
        
        if (body.object === 'page') {
            body.entry.forEach(function(entry) {

                console.log('forEach entry' + body.object);
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
                let sender_psid = webhook_event.sender.id;
                console.log('Sender PSID: ' + sender_psid);

            if (webhook_event.message) {
                application.app.handler.message.handle(application, { sender_psid: sender_psid, message: webhook_event.message }, res);
            } else if (webhook_event.postback) {
                application.app.handler.postback.handle(application, { sender_psid: sender_psid, message: webhook_event.postback }, res);
            }
          });
      
          res.status(200).send('EVENT_RECEIVED');
        } else {
          res.sendStatus(404);
        }   
    });
      
    application.get('/webhook', (req, res) => {
        let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        if (mode && token) {
          if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge); 
          } else {
            res.sendStatus(403);      
          }
        }
    });
}