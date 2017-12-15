var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://test:test@ds135916.mlab.com:35916/todolist');//conect to the DataBase

var todoSchema = new mongoose.Schema({
    item:String
});//create a data type
var Todo = mongoose.model('Todo',todoSchema);//craete a model todo and pase data type


// var data =  [{item:"about"},{item:"help"},{item:"home"},{item:"about"},{item:"help"}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo',function(req,res){
    //res.sendFile('views/todo.html', { root: __dirname });
    //res.render('todo',{todos:data});
    //res.render('todo.html')
    //get data from MongoBD
    Todo.find({},function(err,data){
        if(err)throw err;
        res.render('todo',{todos:data});

    });
    
});
app.get('/about',function(req,res){
    res.send("About");
});

app.post('/todo',urlencodedParser, function(req,res){
    //add data to MongoDB
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
            res.json(data);

    });
});

app.delete('/todo/:item',function(req,res){
    //delete the item from mongoDB
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
    });
    // data = data.filter(function(todo){
    //     return todo.item.replace(/ /g,'-')!== req.params.item;
    // })
    // res.json(data);
});

};