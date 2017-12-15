var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine','ejs');
app.use(express.static('./public'));

//call module controller
todoController(app);

//listenind port
app.listen(3000);
console.log("Port 3000 Listen");