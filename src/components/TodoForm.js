import React from 'react';


export const TodoForm = (props) => (
  <div className="formcontainer">
  <label><h3>New Todo</h3></label>
    <form className="form-control" onSubmit={props.handleSubmit}>
      <input type="text" placeholder="Enter Todo..." onChange={props.handleInputChange} value=
        {props.currentTodo}/>
          </form>
          </div>
  )