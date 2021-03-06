// Bring in our dependencies
const express = require('express');
const app = express();
const routes = require('./router/routes');

//  Connect all our routes to our application
app.use(express.static('./site'));

app.use('/', routes);
// Turn on that server!
let server = app.listen(8080, () => {
  console.log('App listening on port 8080');
});

module.exports = server;