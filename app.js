const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();

app.use(bodyParser.json());
routes(app);

// app.get('/api', (req, res) => {
//   res.send({ hi: 'there'});
// });


module.exports = app;