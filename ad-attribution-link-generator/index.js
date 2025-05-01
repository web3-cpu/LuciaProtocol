const express = require('express');
const app = express();
const generate = require('./scripts/generate')
const get_controller = require('./controllers/getController')
const post_controller = require('./controllers/postController')
const console = require('./config/log').console;
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    ()=>console.log('server started on '+ PORT)
)

app.get('/link',get_controller.link);

app.post('/create',post_controller.create)