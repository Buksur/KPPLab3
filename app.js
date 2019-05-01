const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + '/view'));
app.listen(port, function() {
  console.log('App is running');
});
