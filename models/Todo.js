var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    id: String,
    name: String,
    isComplete: {type: Boolean, default: false}
}, {timestamps: true})



TodoSchema.statics.changeComplete = function(todoId, cb){
    console.log("method todoId _________"+todoId)
    Todo.findById(todoId, function(err, todo){
        console.log("method todoId _________"+todo + err)
        if(err){
            return cb(err);
        }
        todo.isComplete = !(todo.isComplete);
        todo.save(cb)
    })
}
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo
