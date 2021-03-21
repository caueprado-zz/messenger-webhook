url

https://face-messages.herokuapp.com/webhook


curl -X GET "{url}=<VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

curl -H "Content-Type: application/json" -X POST "{url}" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE", "sender": {"id":1234567} }]}]}'

curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE", "sender": {"id":1234567} }]}]}'


https://graph.facebook.com/v2.6/me/messages
