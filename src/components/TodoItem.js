import React from 'react';
import {Component} from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import TodoList from './TodoList'
import '../style.css'

class TodoItem extends Component {
    constructor(props){
        super(props);
        this.state={
            isEditing: false,
            editedVal: this.props.name
        }
        
    }
    handleEditChange = (ev) => {
        ev.preventDefault();

        this.setState({
            editedVal: ev.target.value
        })
    }

    render() {
        const { _id, isComplete, name, updatedAt, handleComplete, handleDelete, handleNameChange } = this.props;
        return (
            <div className="todos">
            <li>
                <div className="leftcontainer">
               
            {
                this.state.isEditing 
                ? 
                <form onSubmit={() =>handleNameChange(_id, this.state.editedVal)}>
                <input type="text" value={this.state.editedVal} onChange={this.handleEditChange}/>
                </form> 
                :
                    <span className="name">
                    <Link to={`${_id}`}><h3>{name}</h3></Link> - 
                        </span>
                    
            }   
            <h6>{updatedAt}</h6>
            

               </div>
               <div className="todoboxcontainer">
               
               <Link to={`${_id}`}>See More-></Link>
               <h3>
               Completion: 
               </h3>
               <div className="checkboxFive">
                   <input type='checkbox' id="checkBoxFiveInput"
                       checked={isComplete} onClick={() => handleComplete(_id)}/>
                   <label htmlFor="checkboxFiveInput" onClick={() => handleComplete(_id)}></label>
               </div>
               
               </div>
               <button type="button" className="btn btn-outline-primary"
                onClick={() => this.setState({ isEditing: !this.state.isEditing })}>
               Edit Todo
               </button>
               <button type="button" className="btn btn-outline-danger" 
               onClick={() => handleDelete(_id)}>
                    Delete Todo
                    </button>
               </li>
               </div>
        )
    }
}


export default TodoItem