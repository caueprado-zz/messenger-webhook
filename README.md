url

https://face-messages.herokuapp.com/


curl -X GET "https://face-messages.herokuapp.com/webhook?hub.verify_token=dXNlcm5hbWU6cGFzc3dvcmQ&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'

