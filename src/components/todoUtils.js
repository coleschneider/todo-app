import moment from 'moment';

export const formatDate = (todo) => {
    todo.updatedAt = moment(todo.updatedAt).format('LLL');
        return todo;
}
export const formatCreationDate = (todo) => {
    todo.createdAt = moment(todo.createdAt).format('LLL');
        return todo;
}

export const addTodo = (list, item) => [...list, item];
export const deleteTodo = (list, item) => [...list, item];