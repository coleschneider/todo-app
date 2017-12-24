import React from 'react';
import {Component} from 'react';
import {TodoList, TodoForm, Navbar} from './components/index';
import moment from 'moment';
import axios from 'axios';
import './style.css'
import * as todoUtils from './components/todoUtils';
const generateId = function() {
    return Math.floor(Math.random() * 100000)
  }

class App extends Component {
  
  componentDidMount() {
   this.fetchTodos();
  }
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            currentTodo: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
     
    }

fetchTodos = () => {
  axios.get('/todos').then((response)=>{
    const todos = response.data;
    console.log(response.data);
   const updatedTodos= todos.map(todoUtils.formatDate) //same as (todo =>{return todoUtils.formatDate(todo);      })
    this.setState({
      todos: updatedTodos
    })
  })
}
    //methods
    handleInputChange = (event) => {
        this.setState({
          currentTodo: event.target.value
        })
      }

      handleComplete(id){
        const allTodos = this.state.todos
        const index = allTodos.findIndex(i => i._id==id)
        const sliceIndex = allTodos[index];
        sliceIndex.isComplete = !sliceIndex.isComplete;
        const sliceTo = allTodos.slice(0, index);
        const sliceAfter = allTodos.slice(index + 1);
        // const newTodos = [
        //   ...allTodos.slice(0, 1),
        //   sliceIndex,
        //   allTodos.slice(3)
        // ];
        axios.put('/todos/' + id, {
          isComplete: sliceIndex.isComplete,
        }).then((res) => {
        console.log(res);
        this.setState({
          todos: [
            ...sliceTo,
            sliceIndex,
            ...sliceAfter
          ]
        })
        // update list of todos in state, by finding the todo in the todos array
          // and flipping its isComplete togo
          
        })
      }
      handleNameChange(id, input){
        //get all todos
        const allTodos = this.state.todos
        //find index matching the id passed into params
        const index = allTodos.findIndex(i => i._id==id)
        //get the object at the index of matching id
        const sliceIndex = allTodos[index];
        //slice to -1 before the object that is getting change
        const sliceTo = allTodos.slice(0, index);
        //slice +1 after the objects index being changed
        const sliceAfter = allTodos.slice(index + 1);
        axios.put('/todos/' + id, {
          name: input
        }).then((res) => {
        this.setState({
          todos: [
            ...sliceTo,
            sliceIndex,
            ...sliceAfter
          ]
        })
      })
    }

      handleDelete(id){
        const remainder = this.state.todos.filter((todo) => {
          if(todo._id !== id){
            return todo;
          }
        });
        axios.delete('/todos/'+id)
          .then((res) => {
            this.setState({
              todos: remainder
            });      
          })
      }

      handleSubmit(event){
        event.preventDefault();
        
        const newTodo = {
          name: this.state.currentTodo,
          isComplete: this.state.isComplete
        }
        const updatedTodos = todoUtils.addTodo(this.state.todos, newTodo);
        axios.post('/todos', {
          name:this.state.currentTodo
        }).then(response => {
          this.setState({
            currentTodo: ''
          })
        }).then(this.fetchTodos)
    }


    render() {
      
        return (
            <div>
            <div>
            <Navbar />
            </div>
            <div className="todo-app">
              <TodoForm handleInputChange={this.handleInputChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={this.handleSubmit} />
              
              </div>
              
              <ul>
              <TodoList todos={this.state.todos} 
              handleComplete={this.handleComplete} 
              handleDelete={this.handleDelete} 
              isEditing={this.state.isEditing}
              toggleEdit={this.toggleEdit}
              handleNameChange={this.handleNameChange}
              />
            </ul>
            </div>
            
          );
    }
}


export default App;