import React from 'react';
import {Component} from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import {TodoPage} from './TodoPage';
//import Note from './Note'
import {Navbar} from './Navbar'
import * as todoUtils from './todoUtils';


class Todo extends Component {
    componentWillMount() {
        const param = this.state.id._id
        
        axios.get('/todos/' + param).then(res => {
            console.log(res.data);
            const createdAtUpdated = todoUtils.formatCreationDate(res.data);
            const formattedTodo = todoUtils.formatDate(createdAtUpdated);
            this.setState({
                todo: formattedTodo
            })
        })
    }



    constructor(props){
    super(props);
    this.state ={
        id: props.match.params,
        todo: {},
        isEditing: false,
        editedVal: ''
    }
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEditChange = this.handleEditChange.bind(this)
}

handleEditChange = (ev) => {
    ev.preventDefault();
    
    this.setState({
        editedVal: ev.target.value
    })
}
    handleChangeComplete(id){
        this.state.todo.isComplete = !this.state.todo.isComplete;
        const updatedTodo = {
            name: this.state.todo.name,
            updatedAt: this.state.todo.updatedAt,
            createdAt: this.state.todo.createdAt,
            isComplete: this.state.todo.isComplete
        }
        axios.put('/todos/' + id, {
            name: this.state.todo.name,
            updatedAt: this.state.todo.updatedAt,
            createdAt: this.state.todo.createdAt,
            isComplete: this.state.todo.isComplete
        }
    ).then(res => {
        this.setState({
            todo: updatedTodo
            })
        })
    }

    
    handleNameChange(id, input){
        //get the todo
        this.state.todo.name = input
        axios.put('/todos/' + id, {
          name: this.state.todo.name
        }).then((res) => {
        this.setState({
            todo: {
                name: input
            }
        })
      })
    }
    handleDelete(id){
        axios.delete('/todos/'+id)
          .then((res) => {
            window.history.back();
          })
      }

    render(){
        return (
            <div>
            <div>
            <Navbar />
            </div>
            <div className="todoContainer">

                <form onSubmit={() => this.handleNameChange(this.state.todo._id, this.state.editedVal)}>
            {this.state.isEditing 
                ? 
                
                <input type="text" value={this.state.editedVal} onChange={this.handleEditChange}/>
                
                :
                <h1>
                {this.state.todo.name}
                </h1>
            }
            </form> 
                Last updated:
                <h4>
                    {this.state.todo.updatedAt}
                </h4>
                Created:
                <h4>
                    {this.state.todo.createdAt}
                </h4>

                <div className="todoboxcontainer">
                <div className="buttons">
                <button type="button" className="btn btn-outline-primary" onClick={() => {
                    this.setState({
                        isEditing: true
                    })
                }}>
                Edit
                </button>
                
                <button type="button" className="btn btn-outline-danger" onClick={()=> this.handleDelete(this.state.todo._id)}>
                Delete
                </button>
                </div>
                <h3>
                    Completion : 
                </h3>
                    <div className="checkboxFive">
                    <input type='checkbox' id="checkBoxFiveInput"
                            checked={this.state.todo.isComplete} 
                            onClick={() =>this.handleChangeComplete(this.state.todo._id)}/>
                    <label htmlFor="checkboxFiveInput" onClick={() => this.handleChangeComplete(this.state.todo._id)}></label>
                 </div>
                </div>
            </div>
            
            <div className="notecontainer">
                
                
            
            </div>
        </div>

        )
    }
}


export default Todo;