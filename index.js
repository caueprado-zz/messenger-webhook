var app = require('./config/server');
require('dotenv').config();

app.listen(process.env.PORT || 1337, () => 
    console.log('webhook is listening')
);