import React, { useState } from 'react';
import '../styles/ProjectVew.css';
import api,{createSecretGist} from '../Api/api';
import Todo from './Todo';

const ProjectView = ({ project, onBack }) => {
  const [todoDescription, setTodoDescription] = useState('');
  const [todos, setTodos] = useState(project.todos || []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [projectTitle, setProjectTitle] = useState(project.title);

  const addTodo = async () => {
    try {
      const response = await api.post(`/projects/${project.id}/todos`, {
        description: todoDescription,
        status: 'pending',
      });
      setTodos([...todos, response.data]); 
      setTodoDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const saveTitle = async () => {
    try {
      await api.put(`/projects/${project.id}`, { title: projectTitle });
      setIsEditingTitle(false);
    } catch (error) {
      console.error('Error updating project title:', error);
    }
  };
  const updateTodos = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };
  const exportAsMarkdown = async () => {
    const completedTodos = todos.filter((todo) => todo.status === 'complete');
    const pendingTodos = todos.filter((todo) => todo.status === 'pending');

    const markdownContent = `
# ${projectTitle}

### Summary:
${completedTodos.length} / ${todos.length} completed.

### Pending Tasks:
${pendingTodos.map((todo) => `- [ ] ${todo.description}`).join('\n')}

### Completed Tasks:
${completedTodos.map((todo) => `- [x] ${todo.description}`).join('\n')}
    `.trim();

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectTitle}.md`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    try {
      const gist = await createSecretGist(projectTitle, markdownContent);
      alert(`Gist created successfully! View it here: ${gist.html_url}`);
    } catch (error) {
      console.error('Error creating Gist:', error);
    }
  };



  return (
    <div className="project-view">
      <button onClick={onBack}>Back to Projects</button>
      <div className="project-title">
  {isEditingTitle ? (
    <>
      <input
        type="text"
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
      <button onClick={saveTitle}>Save</button>
    </>
  ) : (
    <>
      <h3>{projectTitle}</h3>
      <button onClick={() => setIsEditingTitle(true)}>Edit</button>
    </>
  )}
</div>

      <button onClick={exportAsMarkdown} className="export-button">
        Export Summary
      </button>
      <div className="add-todo">
        <textarea
          rows="3"
          cols="30"
          placeholder="Todo Description"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
         <button onClick={addTodo}>Add Todo</button>
      </div>
     
      <Todo 
        todos={todos}
        updateTodos={updateTodos} 
        removeTodo={removeTodo}
      />
    </div>
  );
}

export default ProjectView;
