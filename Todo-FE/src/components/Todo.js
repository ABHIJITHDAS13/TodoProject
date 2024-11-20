  import React,{ useState } from 'react';
  import "../styles/Todo.css";
  import api from '../Api/api';

  const Todo = ({ todos, updateTodos, removeTodo }) => {
    const [editingTodo, setEditingTodo] = useState(null);
    const [editDescription, setEditDescription] = useState('');


    const toggleStatus = async (todo) => {
      const newStatus = todo.status === 'pending' ? 'complete' : 'pending';
      try {
        const response = await api.put(`/todos/${todo.id}`, { status: newStatus });
        updateTodos(response.data); 
      } catch (error) {
        console.error('Error toggling todo status:', error);
      }
    };
    const startEditing = (todo) => {
      setEditingTodo(todo.id);
      setEditDescription(todo.description);
    };
   

    const saveEdit = async (todo) => {
      try {
        const response = await api.put(`/todos/${todo.id}`, { description: editDescription });
        updateTodos(response.data); 
        setEditingTodo(null);
      } catch (error) {
        console.error('Error updating todo description:', error);
      }
    };

    const deleteTodo = async (todoId) => {
      try {
        await api.delete(`/todos/${todoId}`);
        removeTodo(todoId); 
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
    
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
      <div className="todo-list">
      <h4>Todos</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.status}`}>
            <div className="todo-details">
              <div className="todo-description">
                {editingTodo === todo.id ? (
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  <span>{todo.description}</span>
                )}
              </div>
              <div className="todo-timestamps">
                <span>Created: {formatDate(todo.created_at)}</span>
                <span>Updated: {formatDate(todo.updated_at)}</span>
              <span className={`status ${todo.status}`}>({todo.status})</span>
              </div>
            </div>
            <div className="todo-actions">
              {editingTodo === todo.id ? (
                <button onClick={() => saveEdit(todo)}>Save</button>
              ) : (
                <button onClick={() => startEditing(todo)}>Edit</button>
              )}

              <button onClick={() => toggleStatus(todo)}>
                {todo.status === 'pending' ? 'Mark as Complete' : 'Mark as Pending'}
              </button>

              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    )
  }

  export default Todo