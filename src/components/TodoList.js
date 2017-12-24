import React from 'react';
import TodoItem from './TodoItem'

export const TodoList = (props) => {
    return (
        <div className="todo-list">
        <h3 className="listtitle">Todo List:</h3>
        {props.todos.map(todo => 
            <TodoItem
            isComplete={todo.isComplete}
             handleDelete={props.handleDelete}
             key={todo._id}
            _id={todo._id}
            handleComplete={props.handleComplete}
            name={todo.name}
            handleNameChange={props.handleNameChange}
            updatedAt={todo.updatedAt}
            />
        )}
    </div>
    )
}