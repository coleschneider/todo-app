const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');


//get Todos

router.get('/', function(req, res, next){
    Todo.find().sort({
        createdAt: -1
    }).exec(function(err, todos){
        if (err) {
            return next(err);
        }
        res.json(todos);
    });
});



//post a todo
router.post('/', function(req, res, next){
    Todo.create(req.body, function(err, todo){
        if (err){
            return next(err);
        }
        console.log('New todo created: ');
        console.log(todo);
        res.json(todo);
    })
})

router.put('/:id', (req, res, next) => {
    const todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId, req.body, function(err, todo){
        if (err){
            return next(err);
        }
        res.send(200);
    })
})

//get id by params
router.get('/:id', function(req, res, next){
    Todo.findById(req.params.id, req.body, function(err, todo){
        if(err){
            return next(err);
        }
        
        console.log("$$$$$$$" + req.params.id)
        console.log(err);
        res.json(todo);
    })
})

//findby id and change is complete
router.put('/:id', (req, res, next) => {
    const todoId = req.params.id;
    
    console.log(todoId)
    console.log("methods*****" + Todo.changeComplete.toString())
    console.log("$$$$$$" + JSON.stringify(req.params));
    Todo.findByIdAndUpdate(todoId, req.body, function(err, todo){
        if (err){
            return next(err);
        }
        res.send(200);
    })
    // Todo.changeComplete(todoId, function(err, updatedTodo) {
    //     if (err) return next(err);
    //     res.send(200);
    // })
})

router.put('/:id', (req, res, next) =>{
    const theId = req.params.id;

    console.log(theId);
        Todo.changeComplete(theId, function(err, updatedTodo){
            if (err){
                return next(err);
            }
            console.log(updatedTodo);
            res.json(updatedTodo)
        })
})



//updade todo name:
// router.put('/:id', (req, res, next) =>{
// Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo )=>{
//     if(err){
//         return next(err)
//     }
//     res.json(todo);

//     })
// })



//delete

router.delete('/:id', (req, res, next) => {
    Todo.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
      if (err) return next(err);
      console.log('Todo deleted:');
      console.log(todo);
      res.json(todo);
    });
  });



module.exports = router;