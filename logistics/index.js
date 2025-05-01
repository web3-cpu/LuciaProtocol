let express = require('express');
let cors = require('./common/routes/middleware/allowCrossOrigins');
//var markedJsTransform = require('jstransformer')(require('jstransformer-marked'))

let path = require('path');
let app = express();

app.set('view engine','pug');
app.set('views', './views');

app.use(cors);
//top level routes
app.use('/articles',articleRouter);
app.use('/examples',exampleRouter);
app.use('/api',apiRouter);
app.use('/public', express.static(__dirname + '/public'));
app.locals.pretty = true; // indent produces HTML for clarity
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.send('Hello my world');
});

app.use(errorHandler);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

